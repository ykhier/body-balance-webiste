// src/app/admin/_components/AdminHeader.tsx
import ThemeToggle from "@/components/ui/ThemeToggle";
import LeafIcon from "@/components/ui/LeafIcon";

const GREEN = "#4E8B6E";

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white dark:bg-[#161B22] border-b border-gray-200 dark:border-gray-800/70 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur-sm shadow-[0_1px_4px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${GREEN}18`, border: `1.5px solid ${GREEN}40` }}>
          <LeafIcon size={15} className="text-[#4E8B6E]" />
        </div>
        <div>
          <h1 className="font-bold text-sm text-gray-900 dark:text-white leading-tight">פאנל ניהול</h1>
          <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">Body Balance</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="פתח את האתר"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200"
          style={{
            color: GREEN,
            borderColor: `${GREEN}50`,
            backgroundColor: `${GREEN}08`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = GREEN;
            (e.currentTarget as HTMLElement).style.color = "white";
            (e.currentTarget as HTMLElement).style.borderColor = GREEN;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = `${GREEN}08`;
            (e.currentTarget as HTMLElement).style.color = GREEN;
            (e.currentTarget as HTMLElement).style.borderColor = `${GREEN}50`;
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          האתר
        </a>

        <button
          onClick={onLogout}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-red-300 hover:text-red-500 dark:hover:border-red-700 dark:hover:text-red-400 transition-all duration-200"
        >
          יציאה
        </button>
      </div>
    </header>
  );
}
