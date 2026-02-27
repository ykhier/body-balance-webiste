// src/components/ui/SectionTitle.tsx
// Reusable section heading + optional subtitle

import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  center = true,
}: SectionTitleProps) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {/* Decorative accent bar */}
      <div
        className={`w-12 h-1 rounded-full bg-gradient-to-l from-rose-400 to-orange-300 mb-4 ${
          center ? "mx-auto" : ""
        }`}
      />
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-gray-500 text-base md:text-lg max-w-xl leading-relaxed ${
            center ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
