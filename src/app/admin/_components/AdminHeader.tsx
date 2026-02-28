// src/app/admin/_components/AdminHeader.tsx
import ThemeToggle from "@/components/ui/ThemeToggle";

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">🌿</span>
        <div>
          <h1 className="font-extrabold text-lg leading-tight">פאנל ניהול</h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Body Balance Admin
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="פתח את האתר בחלון חדש"
          className="inline-flex items-center gap-1.5 text-sm font-medium
            text-[#4E8B6E] border border-[#4E8B6E]/40 bg-[#4E8B6E]/5
            hover:bg-[#4E8B6E] hover:text-white hover:border-[#4E8B6E]
            dark:text-emerald-400 dark:border-emerald-700 dark:bg-emerald-900/10
            dark:hover:bg-emerald-600 dark:hover:text-white dark:hover:border-emerald-600
            px-3 py-1.5 rounded-lg transition-all duration-200"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 shrink-0"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          האתר
        </a>

        <button
          onClick={onLogout}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors
            border border-gray-300 hover:border-red-300
            dark:text-gray-400 dark:border-gray-700 dark:hover:text-red-400 dark:hover:border-red-800
            px-3 py-1.5 rounded-lg"
        >
          יציאה
        </button>
      </div>
    </header>
  );
}
