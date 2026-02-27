// src/components/sections/Navbar.tsx
// Sticky top navigation with smooth-scroll links and mobile hamburger menu
"use client";

import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import BodyBalanceLogo from "@/components/ui/BodyBalanceLogo";

const NAV_LINKS = [
  { label: "ראשי", href: "#hero" },
  { label: "אודות", href: "#about" },
  { label: "קהלי יעד", href: "#audience" },
  { label: "שירותים", href: "#services" },
  { label: "תשלום", href: "#payment" },
  { label: "צרו קשר", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Add shadow when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="hover:opacity-85 transition-opacity duration-200"
          aria-label="Body Balance - עמוד הבית"
        >
          <BodyBalanceLogo size={34} animated />
        </a>

        {/* Desktop links */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="ניווט ראשי"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="relative text-gray-600 dark:text-gray-300 font-medium text-sm
                         after:absolute after:bottom-[-2px] after:right-0 after:h-[2px]
                         after:w-0 after:bg-rose-500 after:rounded-full after:transition-all
                         after:duration-300 hover:after:w-full hover:text-rose-500
                         transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions: theme toggle + mobile hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-gray-800 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="תפריט ניווט"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav
          className="md:hidden bg-white dark:bg-gray-900 backdrop-blur border-t border-rose-100 dark:border-gray-700 px-6 py-4 flex flex-col gap-4"
          aria-label="תפריט נייד"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-gray-700 dark:text-gray-200 font-semibold hover:text-rose-500 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
