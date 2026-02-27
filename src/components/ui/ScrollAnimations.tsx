// src/components/ui/ScrollAnimations.tsx
// ─────────────────────────────────────────────────────────────────
// Bidirectional scroll animation engine.
//
// KEY RULE:
//   enter viewport  → add    .is-visible  (CSS transition plays)
//   leave viewport  → remove .is-visible  (instant snap, no flash)
//
// This means animations replay on EVERY scroll cycle, in both
// directions — no "fire once" logic anywhere.
//
// Edge-cases handled:
//   • Nav-jump (smooth-scroll skips sections) → 'reveal-check' event
//     + scroll-debounce reveals in-viewport elements and silently
//     shows jumped-past ones so they don't flash-in above the fold.
//   • prefers-reduced-motion   → all transitions disabled.
// ─────────────────────────────────────────────────────────────────
"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ── Reveal ────────────────────────────────────────────────────
    // instant=true → used for elements above the viewport after a
    // nav-jump; we show them without animation so they don't slide
    // in from off-screen when the user is already past them.
    const revealEl = (el: HTMLElement, instant = false) => {
      if (el.classList.contains("is-visible")) return;
      if (instant || reduced) {
        el.style.transition = "none";
        el.style.transitionDelay = "0ms";
      } else {
        const d = parseInt(el.dataset.delay ?? "0", 10);
        if (d > 0) el.style.transitionDelay = `${d}ms`;
      }
      el.classList.add("is-visible");
    };

    // ── Reset ─────────────────────────────────────────────────────
    // Removes is-visible so the element can animate again on re-entry.
    // We must disable the CSS transition BEFORE removing the class,
    // otherwise the element visibly fades/slides back to hidden.
    // Double-rAF ensures the browser paints the snapped hidden state
    // before we re-enable transitions for the next reveal cycle.
    const resetEl = (el: HTMLElement) => {
      el.style.transition = "none"; // snap immediately — no reverse anim
      el.style.transitionDelay = "0ms";
      el.classList.remove("is-visible");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = ""; // re-enable for next reveal
          el.style.transitionDelay = "";
        });
      });
    };

    // ── 1. IntersectionObserver (bidirectional) ───────────────────
    // threshold:0  → fires the moment any pixel enters OR leaves.
    // On exit we ALWAYS reset — regardless of which direction the
    // element left — so it will animate again on the next entry.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealEl(entry.target as HTMLElement);
          } else {
            resetEl(entry.target as HTMLElement);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );

    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));

    // ── 2. Nav-jump fallback ──────────────────────────────────────
    // After a programmatic smooth-scroll the observer can miss fast-
    // moving elements. Scan the full DOM: instant-reveal anything
    // already above the viewport; normally animate in-viewport items.
    const revealInViewport = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        if (bottom <= 0)
          revealEl(el, true); // above fold
        else if (top < window.innerHeight * 0.96) revealEl(el, false); // in view
        // below fold → observer will handle it naturally
      });
    };

    window.addEventListener("scrollend", revealInViewport, { passive: true });
    let debounce: ReturnType<typeof setTimeout>;
    const onScrollDebounce = () => {
      clearTimeout(debounce);
      debounce = setTimeout(revealInViewport, 150);
    };
    window.addEventListener("scroll", onScrollDebounce, { passive: true });
    // Navbar dispatches this at 100/350/700/1200 ms after a nav click
    window.addEventListener("reveal-check", revealInViewport);

    // ── 3. Parallax blob ─────────────────────────────────────────
    const parallaxEl = document.querySelector<HTMLElement>("[data-parallax]");
    let ticking = false;
    const onScroll = () => {
      if (reduced || !parallaxEl || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        parallaxEl.style.transform = `translateY(${window.scrollY * 0.06}px)`;
        ticking = false;
      });
    };
    if (!reduced && parallaxEl)
      window.addEventListener("scroll", onScroll, { passive: true });

    // ── 4. Navbar compact state ───────────────────────────────────
    const headerEl = document.querySelector<HTMLElement>("header");
    let hTick = false;
    const onHeaderScroll = () => {
      if (!headerEl || hTick) return;
      hTick = true;
      requestAnimationFrame(() => {
        headerEl.classList.toggle("is-scrolled", window.scrollY > 60);
        hTick = false;
      });
    };
    window.addEventListener("scroll", onHeaderScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onHeaderScroll);
      window.removeEventListener("scroll", onScrollDebounce);
      window.removeEventListener("scrollend", revealInViewport);
      window.removeEventListener("reveal-check", revealInViewport);
      clearTimeout(debounce);
    };
  }, []);

  return null;
}
