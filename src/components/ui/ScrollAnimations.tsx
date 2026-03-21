// src/components/ui/ScrollAnimations.tsx
// ─────────────────────────────────────────────────────────────────
// Bidirectional scroll animation engine.
//
// How it works:
//   enter viewport  → add    .is-visible  (CSS transition plays)
//   exit  viewport  → remove .is-visible  (instant snap, no flash)
//
// The IntersectionObserver is the SOLE source of truth for
// adding/removing is-visible. revealInViewport() is a safety-net
// for nav-jumps only — it NEVER touches above-fold elements so
// it cannot prevent re-animation on a second downward scroll.
//
// prefers-reduced-motion → all transitions disabled.
// ─────────────────────────────────────────────────────────────────
"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ── Reveal ────────────────────────────────────────────────────
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
    // Snaps instantly to hidden (no reverse animation),
    // then re-enables transitions for the next reveal cycle.
    const resetEl = (el: HTMLElement) => {
      el.style.transition = "none";
      el.style.transitionDelay = "0ms";
      el.classList.remove("is-visible");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = "";
          el.style.transitionDelay = "";
        });
      });
    };

    // ── IntersectionObserver ──────────────────────────────────────
    // Handles ALL adds/removes of is-visible.
    // Direction aware:
    //   • Exits above viewport (user scrolled DOWN past element)
    //     → reset silently; element will re-animate on next entry.
    //   • Exits below viewport (user scrolled UP past element)
    //     → reset silently; element will re-animate when scrolled to.
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
      { threshold: 0, rootMargin: "0px 0px -10px 0px" },
    );

    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));

    // ── Nav-jump safety net ───────────────────────────────────────
    // Only reveals elements that are CURRENTLY in the viewport.
    // NEVER touches above-fold elements — doing so would add
    // is-visible and block re-animation on the next scroll-down pass.
    const revealInViewport = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const { top } = el.getBoundingClientRect();
        // Only animate elements currently on screen (not above, not below)
        if (top >= 0 && top < window.innerHeight * 0.96) {
          revealEl(el, false);
        }
      });
    };

    // Navbar dispatches reveal-check at 100/350/700/1200ms after nav click
    window.addEventListener("reveal-check", revealInViewport);
    // scrollend catches the final resting position after any scroll
    window.addEventListener("scrollend", revealInViewport, { passive: true });

    // ── Parallax blob ─────────────────────────────────────────────
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

    // ── Navbar compact state ──────────────────────────────────────
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
      window.removeEventListener("scrollend", revealInViewport);
      window.removeEventListener("reveal-check", revealInViewport);
    };
  }, []);

  return null;
}
