// src/components/sections/Services.tsx
"use client";

import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useT } from "@/contexts/LanguageContext";

const META = [
  { num: "01", icon: "📅", tint: "bg-rose-50/80 dark:bg-rose-950/20",   border: "border-rose-100/60 dark:border-rose-900/30" },
  { num: "02", icon: "📋", tint: "bg-orange-50/80 dark:bg-orange-950/20", border: "border-orange-100/60 dark:border-orange-900/30" },
  { num: "03", icon: "🎯", tint: "bg-pink-50/80 dark:bg-pink-950/20",     border: "border-pink-100/60 dark:border-pink-900/30" },
  { num: "04", icon: "💬", tint: "bg-emerald-50/80 dark:bg-emerald-950/20", border: "border-emerald-100/60 dark:border-emerald-900/30" },
];

export default function Services() {
  const t = useT();
  const items = t.services.items.map((item, i) => ({ ...item, ...META[i] }));

  return (
    <section id="services" className="section-padding bg-[#FDFAF5] dark:bg-gray-900" aria-labelledby="services-heading">
      <div className="section-container">
        <div data-reveal>
          <SectionTitle title={t.services.title} subtitle={t.services.subtitle} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-reveal data-stagger>
          {items.map((service) => (
            <div key={service.title}
              className={`card-premium group relative overflow-hidden ${service.tint} p-7 border ${service.border} flex gap-5 items-start`}>

              {/* Background number */}
              <span className="absolute top-2 left-3 text-[5rem] font-black leading-none select-none pointer-events-none text-gray-900/[0.04] dark:text-white/[0.04] group-hover:text-gray-900/[0.07] dark:group-hover:text-white/[0.06] transition-all duration-300" aria-hidden="true">
                {service.num}
              </span>

              <div className="relative z-10 flex-shrink-0 w-13 h-13 w-14 h-14 bg-white dark:bg-gray-700/80 rounded-2xl flex items-center justify-center text-2xl shadow-[0_3px_12px_rgba(78,139,110,0.10)] border border-white dark:border-gray-600/40 group-hover:scale-105 transition-transform duration-300" aria-hidden="true">
                {service.icon}
              </div>

              <div className="relative z-10 pt-1">
                <h3 className="text-lg font-extrabold text-gray-800 dark:text-white mb-2 leading-snug">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div data-reveal data-delay="100" className="mt-12 relative overflow-hidden rounded-3xl p-8 sm:p-10 text-center text-white bg-gradient-to-l from-rose-600 via-rose-500 to-rose-400 shadow-[0_12px_48px_rgba(78,139,110,0.30)] dark:shadow-[0_12px_48px_rgba(244,63,94,0.20)]">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
          <p className="relative text-xl sm:text-2xl font-extrabold mb-2 tracking-tight">{t.services.ctaTitle}</p>
          <p className="relative text-rose-100 text-sm sm:text-base mb-6 max-w-md mx-auto">{t.services.ctaDesc}</p>
          <a href="https://wa.me/972542576613" target="_blank" rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2.5 bg-white text-rose-500 font-bold px-8 py-3.5 rounded-full hover:bg-rose-50 hover:-translate-y-0.5 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.15)] text-sm sm:text-base">
            <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="#25D366"/><path fill="white" d="M24 10.5C16.544 10.5 10.5 16.544 10.5 24c0 2.98.88 5.75 2.39 8.07L10.5 37.5l5.6-2.35A13.41 13.41 0 0 0 24 37.5c7.456 0 13.5-6.044 13.5-13.5S31.456 10.5 24 10.5zm0 24.75a11.2 11.2 0 0 1-5.69-1.55l-.41-.24-4.25.99 1.01-3.9-.27-.42A11.22 11.22 0 0 1 12.75 24c0-6.213 5.037-11.25 11.25-11.25S35.25 17.787 35.25 24 30.213 35.25 24 35.25zm6.17-8.13c-.34-.17-2-.99-2.31-1.1-.31-.11-.54-.17-.76.17-.22.34-.87 1.1-1.07 1.33-.2.22-.39.25-.73.08-.34-.17-1.43-.53-2.72-1.68-1.01-.9-1.69-2.01-1.88-2.34-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.59.17-.2.22-.34.34-.57.11-.22.06-.42-.03-.59-.08-.17-.76-1.84-1.04-2.52-.28-.66-.55-.57-.76-.58l-.65-.01c-.22 0-.59.08-.9.42-.31.34-1.18 1.16-1.18 2.83s1.21 3.28 1.38 3.51c.17.22 2.39 3.65 5.79 5.12.81.35 1.44.56 1.93.71.81.26 1.55.22 2.13.13.65-.1 2-.82 2.29-1.61.28-.79.28-1.47.2-1.61-.09-.14-.31-.22-.65-.39z"/></svg>
            {t.services.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
