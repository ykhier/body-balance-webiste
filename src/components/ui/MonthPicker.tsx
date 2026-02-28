"use client";

import React from "react";

interface MonthPickerProps {
  value: string;
  onChange: (val: string) => void;
}

export default function MonthPicker({ value, onChange }: MonthPickerProps) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-sm w-fit">
      {/* Calendar icon */}
      <svg
        className="w-4 h-4 text-[#4E8B6E] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>

      <input
        type="month"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer min-w-[120px]"
        aria-label="בחירת חודש"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          title="הצג הכל"
          className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-colors text-xs font-bold shrink-0"
          aria-label="נקה פילטר חודש"
        >
          ✕
        </button>
      )}
    </div>
  );
}
