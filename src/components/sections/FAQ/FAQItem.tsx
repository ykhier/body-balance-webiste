// src/components/sections/FAQ/FAQItem.tsx
"use client";

interface Props {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ question, answer, isOpen, onToggle }: Props) {
  return (
    <div className={`rounded-2xl border transition-all duration-300 ${
      isOpen
        ? "border-rose-300/50 dark:border-rose-700/40 bg-white dark:bg-gray-800 shadow-[0_4px_24px_rgba(78,139,110,0.10)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        : "border-gray-200/70 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-rose-200 dark:hover:border-rose-800/50 hover:shadow-[0_2px_12px_rgba(78,139,110,0.06)]"
    }`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
      >
        <span className={`font-semibold text-base md:text-lg leading-snug transition-colors duration-200 ${
          isOpen ? "text-rose-600 dark:text-rose-400" : "text-gray-800 dark:text-gray-100"
        }`}>
          {question}
        </span>

        <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 ${
          isOpen
            ? "bg-gradient-to-br from-rose-500 to-rose-400 text-white rotate-180 shadow-[0_4px_12px_rgba(78,139,110,0.28)]"
            : "bg-rose-50 dark:bg-gray-700/80 text-rose-500 dark:text-rose-400"
        }`} aria-hidden="true">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="px-6 pb-5">
            <div className="w-8 h-px bg-rose-200 dark:bg-rose-800/40 mb-3" />
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
