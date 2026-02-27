// src/components/ui/ScrollAnimations.tsx
// ─────────────────────────────────────────────────────────────────
// Lightweight scroll animation engine — no heavy libraries.
//
// What this does:
//  1. IntersectionObserver: watches [data-reveal] elements,
//     applies data-delay as transitionDelay, then adds .is-visible.
//     Fires once per element (unobserved after trigger).
//  2. Scroll + rAF: moves [data-parallax] blobs very slightly
//     slower than scroll (max ~15px shift — extremely subtle).
//  3. Navbar: adds .is-scrolled to <header> after 60px scroll.
//
// Works with RTL. Respects prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────────
"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── 1. Reveal on scroll (IntersectionObserver) ──────────────
    // Threshold 0.08 + rootMargin -50px: fires when ~1/12 of the
    // element has entered the viewport and is clearly in view.
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;

            // Apply per-element stagger delay from data-delay attribute
            const delay = parseInt(el.dataset.delay ?? "0", 10);
            if (delay > 0) {
              el.style.transitionDelay = `${delay}ms`;
            }

            el.classList.add("is-visible");
            revealObserver.unobserve(el); // fire only once
          }
        });
      },
      {
        threshold: 0.08,
        // Negative bottom margin: element must scroll 50px past the
        // viewport bottom edge before triggering — ensures animation
        // is clearly visible as it enters, not already fully in view.
        rootMargin: "0px 0px -50px 0px",
      }
    );

    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => revealObserver.observe(el));

    // ── 2. Parallax blob ─────────────────────────────────────────
    const parallaxEl = document.querySelector<HTMLElement>("[data-parallax]");
    let ticking = false;

    const onScroll = () => {
      if (prefersReducedMotion || !parallaxEl) return;
      if (!ticking) {
        requestAnimationFrame(() => {
          const shift = window.scrollY * 0.06;
          parallaxEl.style.transform = `translateY(${shift}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    if (!prefersReducedMotion && parallaxEl) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // ── 3. Navbar compact state ──────────────────────────────────
    const headerEl = document.querySelector<HTMLElement>("header");
    let headerTicking = false;

    const onHeaderScroll = () => {
      if (!headerEl) return;
      if (!headerTicking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 60) {
            headerEl.classList.add("is-scrolled");
          } else {
            headerEl.classList.remove("is-scrolled");
          }
          headerTicking = false;
        });
        headerTicking = true;
      }
    };

    window.addEventListener("scroll", onHeaderScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onHeaderScroll);
    };
  }, []);

  return null;
}
