// src/app/admin/_components/SearchBar.tsx
"use client";

import { FormEvent } from "react";

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
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="חיפוש לפי שם / אימייל / טלפון..."
        className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm
          text-gray-900 placeholder-gray-400
          dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-[#4E8B6E]"
      />
      <button
        type="submit"
        className="bg-[#4E8B6E] hover:bg-[#3d7059] text-white px-4 py-2 sm:py-1.5 rounded-lg text-sm font-bold transition-colors shrink-0"
      >
        חפש
      </button>
      {activeSearch && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-white px-2"
        >
          נקה
        </button>
      )}
    </form>
  );
}
