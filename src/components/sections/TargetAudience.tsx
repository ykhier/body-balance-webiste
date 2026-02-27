// src/components/sections/TargetAudience.tsx
"use client";

import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const AUDIENCE_DATA = [
  {
    icon: "🧒",
    title: "ילדים",
    description:
      "תוכניות תזונה מותאמות לילדים הכוללות הרגלי אכילה בריאים, מזונות עשירים בוויטמינים ותמיכה בצמיחה תקינה בצורה כיפית ואהובה.",
    color: "bg-rose-50",
    textColor: "text-rose-500",
  },
  {
    icon: "🌿",
    title: "אורח חיים בריא",
    description:
      "ליווי תזונתי למי שרוצה לשמור על אורח חיים בריא ומאוזן, בניית תפריט יומי מגוון, שיפור הרגלים והטמעת שגרה נכונה לאורך זמן  בלי קיצוניות ובלי תחושת ויתור.",
    color: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    icon: "⚖️",
    title: "ירידה במשקל",
    description:
      "תוכנית ירידה במשקל בגישה מאוזנת וללא רעב, מתמקדת בשינוי הרגלים לטווח ארוך ולא בדיאטה זמנית.",
    color: "bg-rose-50",
    textColor: "text-rose-500",
  },
  {
    icon: "💪",
    title: "עלייה במסת שריר",
    description:
      "תזונה תומכת עבור מי שרוצה לבנות מסת שריר תפריטים עתירי חלבון, עיתוי ארוחות מדויק ותמיכה לצד אימונים.",
    color: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
];

export default function TargetAudience() {
  return (
    <section
      id="audience"
      className="section-padding bg-gradient-to-b from-white to-rose-50 dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="audience-heading"
    >
      <div className="section-container">
        <div data-reveal>
          <SectionTitle
            title="קהלי יעד"
            subtitle="מתאים לכל מי שרוצה לשפר את התזונה שלו בלי קשר לגיל, מטרה או סגנון חיים"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCE_DATA.map((item, i) => (
            <div key={item.title} data-reveal data-delay={String(i * 90)}>
              <Card
                className="flex flex-col items-center text-center group"
              >
              <div
                className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <h3 className={`text-xl font-extrabold mb-2 ${item.textColor}`}>
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
