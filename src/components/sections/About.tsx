// src/components/sections/About.tsx
"use client";

import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useT } from "@/contexts/LanguageContext";

export default function About() {
  const t = useT();
  const a = t.about;

  const HIGHLIGHTS = [
    { icon: "🌱", text: a.highlights.personal },
    { icon: "⚖️", text: a.highlights.balance },
    { icon: "📲", text: a.highlights.daily },
    { icon: "💪", text: a.highlights.results },
  ];

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">

          {/* Quote panel */}
          <div data-reveal data-from="right" className="flex-shrink-0 w-full md:w-[320px]">
            <div className="relative bg-gradient-to-br from-[#FDFAF5] via-rose-50/50 to-orange-50/30 dark:from-gray-800/80 dark:via-gray-800 dark:to-gray-800 rounded-3xl p-6 sm:p-8 shadow-[0_8px_40px_rgba(78,139,110,0.10)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)] border border-rose-100/50 dark:border-gray-700/50 overflow-hidden">

              {/* Oversized quote decoration */}
              <span className="absolute -top-2 right-4 text-[7rem] font-extrabold leading-none select-none text-rose-100 dark:text-gray-700/50 pointer-events-none" aria-hidden="true">&ldquo;</span>

              <blockquote className="relative z-10">
                <p className="text-gray-600 dark:text-gray-300 italic text-sm sm:text-base leading-relaxed">&ldquo;{a.quote}&rdquo;</p>
                <footer className="mt-7 flex items-center gap-2.5">
                  <div className="w-5 h-px bg-rose-300 dark:bg-rose-700" />
                  <cite className="not-italic font-bold text-rose-500 dark:text-rose-400 text-sm">{t.hero.name}</cite>
                </footer>
              </blockquote>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {HIGHLIGHTS.map((h) => (
                  <div key={h.text} className="flex items-center gap-2 bg-white dark:bg-gray-700/70 rounded-xl px-3 py-2.5 shadow-[0_2px_8px_rgba(78,139,110,0.07)] dark:shadow-none border border-rose-50 dark:border-gray-600/30">
                    <span className="text-base flex-shrink-0">{h.icon}</span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 leading-snug">{h.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text content */}
          <div data-reveal data-from="left" data-delay="180" className="flex-1 text-center md:text-right">
            <SectionTitle title={a.title} subtitle={a.subtitle} center={false} />
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: a.p1 }} />
              <p dangerouslySetInnerHTML={{ __html: a.p2 }} />
              <p dangerouslySetInnerHTML={{ __html: a.p3 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
