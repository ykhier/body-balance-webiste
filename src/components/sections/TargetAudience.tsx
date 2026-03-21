// src/components/sections/TargetAudience.tsx
"use client";

import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useT } from "@/contexts/LanguageContext";

const STYLES = [
  { icon: "🧒", grad: "from-rose-500 to-rose-400",    glow: "shadow-[0_6px_20px_rgba(244,63,94,0.28)]",   ring: "ring-rose-100    dark:ring-rose-900/25" },
  { icon: "🌿", grad: "from-emerald-500 to-emerald-400", glow: "shadow-[0_6px_20px_rgba(52,211,153,0.25)]",  ring: "ring-emerald-100 dark:ring-emerald-900/25" },
  { icon: "⚖️", grad: "from-orange-400 to-amber-400",    glow: "shadow-[0_6px_20px_rgba(251,146,60,0.25)]",  ring: "ring-orange-100  dark:ring-orange-900/25" },
  { icon: "💪", grad: "from-green-500 to-teal-500",      glow: "shadow-[0_6px_20px_rgba(20,184,166,0.25)]",  ring: "ring-teal-100    dark:ring-teal-900/25" },
];

export default function TargetAudience() {
  const t = useT();
  const items = t.audience.items.map((item, i) => ({ ...item, ...STYLES[i] }));

  return (
    <section id="audience" className="section-padding bg-gradient-to-b from-white to-[#FDFAF5] dark:from-gray-900 dark:to-[#0D1A14]" aria-labelledby="audience-heading">
      <div className="section-container">
        <div data-reveal>
          <SectionTitle title={t.audience.title} subtitle={t.audience.subtitle} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-reveal data-stagger>
          {items.map((item) => (
            <div key={item.title} className="h-full">
              <div className="card-premium p-7 flex flex-col items-center text-center h-full group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.grad} ${item.glow} ring-4 ${item.ring} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`} aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="text-lg font-extrabold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
