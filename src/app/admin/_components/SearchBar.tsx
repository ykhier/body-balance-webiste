// src/app/admin/_components/SearchBar.tsx
"use client";

import { FormEvent } from "react";

const GREEN = "#4E8B6E";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  activeSearch: string;
  onSearch: (e: FormEvent) => void;
  onClear: () => void;
}

export default function SearchBar({
  value,
  onChange,
  activeSearch,
  onSearch,
  onClear,
}: SearchBarProps) {
  return (
    <form onSubmit={onSearch} className="flex gap-2 flex-1">
      <div className="relative flex-1">
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="חיפוש לפי שם / אימייל / טלפון..."
          className="admin-input pr-9"
        />
      </div>
      <button
        type="submit"
        className="text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 shrink-0"
        style={{ background: `linear-gradient(135deg, ${GREEN}, #3d7459)`, boxShadow: `0 2px 8px ${GREEN}40` }}
      >
        חפש
      </button>
      {activeSearch && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          נקה
        </button>
      )}
    </form>
  );
}
