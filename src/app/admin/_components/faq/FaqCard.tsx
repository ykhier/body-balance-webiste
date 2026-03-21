// src/app/admin/_components/faq/FaqCard.tsx
"use client";

import { Spinner } from "@/components/ui/spinner";
import type { FaqItem } from "./types";

const GREEN = "#4E8B6E";

export default function FaqCard({
  item, idx, total, onEdit, onDelete, onMove, deleting, moving, disabled,
}: {
  item: FaqItem;
  idx: number;
  total: number;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (dir: "up" | "down") => void;
  deleting: boolean;
  moving: boolean;
  disabled: boolean;
}) {
  return (
    <div className={`admin-card p-4 sm:p-5 transition-all duration-200 ${disabled ? "opacity-40 pointer-events-none" : "hover:shadow-[0_4px_20px_rgba(78,139,110,0.08)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"}`}>
      <div className="flex items-start gap-3">
        {/* Index badge */}
        <span className="shrink-0 mt-0.5 text-xs font-bold rounded-lg w-6 h-6 flex items-center justify-center" style={{ color: GREEN, backgroundColor: `${GREEN}15` }}>
          {idx + 1}
        </span>

        <div className="min-w-0 flex-1 space-y-2.5">
          {/* Hebrew */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">עברית</span>
            <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug mt-0.5">
              {item.questionHe || <em className="text-gray-400 font-normal">ריק</em>}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 line-clamp-1">{item.answerHe}</p>
          </div>

          {/* Arabic */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800/60">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">ערבית</span>
            <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm leading-snug mt-0.5">
              {item.questionAr || <em className="text-gray-400 font-normal">ריק</em>}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 line-clamp-1">{item.answerAr}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/60">
        {/* Reorder */}
        <div className="flex items-center gap-1">
          {(["up", "down"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => onMove(dir)}
              disabled={(dir === "up" ? idx === 0 : idx === total - 1) || moving}
              className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors disabled:opacity-20"
              title={dir === "up" ? "העלה למעלה" : "הורד למטה"}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={dir === "up" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}/>
              </svg>
            </button>
          ))}
          {moving && <Spinner className="size-3 text-gray-400" />}
        </div>

        {/* Edit / Delete */}
        <div className="flex gap-2">
          <button onClick={onEdit}
            className="text-xs px-3 py-1.5 rounded-lg border font-semibold transition-colors"
            style={{ color: GREEN, borderColor: `${GREEN}40`, backgroundColor: "transparent" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = `${GREEN}12`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
          >
            עריכה
          </button>
          <button onClick={onDelete} disabled={deleting}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-200 dark:border-gray-700/60 text-gray-400 dark:text-gray-500 hover:border-red-300 hover:text-red-500 dark:hover:border-red-700/50 dark:hover:text-red-400 rounded-lg transition-colors disabled:opacity-50 font-semibold">
            {deleting && <Spinner className="size-3" />}
            מחיקה
          </button>
        </div>
      </div>
    </div>
  );
}
