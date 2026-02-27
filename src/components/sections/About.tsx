// src/components/sections/About.tsx
"use client";

import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";

const HIGHLIGHTS = [
  { icon: "🌱", text: "תהליך אישי" },
  { icon: "⚖️", text: "איזון ולא ויתורים" },
  { icon: "📲", text: "תמיכה יומיומית" },
  { icon: "💪", text: "תוצאות ארוכות טווח" },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-padding bg-white dark:bg-gray-900"
      aria-labelledby="about-heading"
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Visual accent panel */}
          <div data-reveal data-from="right" className="flex-shrink-0 w-full md:w-80">
            <div className="relative bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-4xl p-8 shadow-card">
              <span
                className="text-rose-200 font-extrabold text-8xl leading-none absolute top-4 right-6 select-none"
                aria-hidden="true"
              >
                &quot;
              </span>
              <p className="text-gray-600 dark:text-gray-300 italic text-base leading-relaxed relative z-10 pt-6">
                &quot;הדרך לאורח חיים בריא מתחילה בצעד אחד קטן – ואני כאן ללכת
                אותה יחד איתך.&quot;
              </p>
              <p className="mt-4 font-bold text-rose-500 text-sm">בראאה חיר</p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {HIGHLIGHTS.map((h) => (
                  <div
                    key={h.text}
                    className="flex items-center gap-2 bg-white dark:bg-gray-600 rounded-xl px-3 py-2 shadow-sm"
                  >
                    <span className="text-lg">{h.icon}</span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-100">
                      {h.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div data-reveal data-from="left" data-delay="180" className="flex-1">
            <SectionTitle
              title="קצת עליי"
              subtitle="הסיפור שלי הוא ההוכחה שהשינוי אפשרי"
              center={false}
            />
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              <p>
                לפני מספר שנים, גם אני עמדתי בנקודה שבה הרגשתי תקועה. ניסיתי
                דיאטות שונות, וויתרתי על דברים שאהבתי עד שהבנתי שהדרך הנכונה היא
                לא ויתור, אלא <strong className="text-rose-500">איזון</strong>.
              </p>
              <p>
                לאחר שהצלחתי לרדת במשקל ולשנות את אורח חיי בצורה שמחזיקה לאורך
                זמן, החלטתי ללמוד תזונה ולהפוך את הידע לשליחות. היום, כמאמנת
                תזונה מוסמכת עם ניסיון של{" "}
                <strong className="text-rose-500">שלוש שנים</strong>, אני מלווה
                אנשים מכל הגילאים לבנות הרגלים בריאים שמתאימים לחיים האמיתיים
                שלהם.
              </p>
              <p>
                הגישה שלי פשוטה:{" "}
                <strong className="text-rose-500">ליווי אישי ואמיתי</strong>,
                תוכנית שמותאמת בדיוק לך ותמיכה שוטפת שתשמור אותך ממוקדת גם
                ברגעים הקשים. כי אנחנו לא עושים את זה לבד.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
