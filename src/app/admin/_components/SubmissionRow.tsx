// src/app/admin/_components/SubmissionRow.tsx

export type Submission = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
  handledAt: string | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("he-IL", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

interface SubmissionRowProps {
  item: Submission;
  expanded: boolean;
  actionLoading: boolean;
  onToggleExpand: () => void;
  onToggleRead: () => void;
  onDelete: () => void;
}

export default function SubmissionRow({ item, expanded, actionLoading, onToggleExpand, onToggleRead, onDelete }: SubmissionRowProps) {
  return (
    <div className={`admin-card overflow-hidden transition-all duration-200 ${!item.read ? "border-l-4 border-l-[#4E8B6E] dark:border-l-emerald-500" : ""}`}>
      {/* Row header */}
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
        onClick={onToggleExpand}
      >
        {/* Unread dot */}
        {!item.read && (
          <div className="w-2 h-2 rounded-full bg-[#4E8B6E] dark:bg-emerald-400 flex-shrink-0 shadow-[0_0_6px_rgba(78,139,110,0.5)]" />
        )}

        <div className="flex-1 min-w-0">
          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{item.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{formatDate(item.createdAt)}</p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate self-center">{item.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 self-center font-mono">{item.phone}</p>
          </div>

          {/* Mobile */}
          <div className="sm:hidden">
            <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{item.name}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{formatDate(item.createdAt)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          <ToggleReadButton item={item} loading={actionLoading} onClick={onToggleRead} />
          <DeleteButton loading={actionLoading} onClick={onDelete} />
          <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800/60 pt-4 space-y-4">
          {/* Mobile contact info */}
          <div className="sm:hidden flex flex-col gap-2.5">
            <a href={`tel:${item.phone}`} onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5 bg-gray-50 dark:bg-white/[0.03] rounded-xl px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#4E8B6E]/8 transition-colors border border-gray-100 dark:border-gray-800/40">
              <span className="text-sm shrink-0">📞</span>
              <span className="font-mono font-medium">{item.phone}</span>
            </a>
            <a href={`mailto:${item.email}`} onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5 bg-gray-50 dark:bg-white/[0.03] rounded-xl px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#4E8B6E]/8 transition-colors border border-gray-100 dark:border-gray-800/40">
              <span className="text-sm shrink-0">✉️</span>
              <span className="font-medium break-all">{item.email}</span>
            </a>
          </div>

          {/* Message */}
          <div>
            <p className="text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-widest">הודעה</p>
            <p className="text-gray-700 dark:text-gray-200 text-sm whitespace-pre-wrap leading-relaxed bg-gray-50 dark:bg-white/[0.03] rounded-xl p-4 border border-gray-100 dark:border-gray-800/40">
              {item.message}
            </p>
          </div>

          {item.handledAt && (
            <p className="text-xs text-gray-400 dark:text-gray-600">טופל: {formatDate(item.handledAt)}</p>
          )}
        </div>
      )}
    </div>
  );
}

function ToggleReadButton({ item, loading, onClick }: { item: Submission; loading: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all duration-200 disabled:opacity-50 ${
        item.read
          ? "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-[#4E8B6E]/50 hover:text-[#4E8B6E] dark:hover:text-emerald-400"
          : "border-[#4E8B6E]/40 text-[#4E8B6E] dark:text-emerald-400 dark:border-emerald-700/40 hover:bg-[#4E8B6E] hover:text-white hover:border-[#4E8B6E] dark:hover:bg-emerald-600"
      }`}
    >
      {loading ? "..." : item.read ? "החזר לטיפול" : "סמן כטופל"}
    </button>
  );
}

function DeleteButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700/60 text-gray-400 dark:text-gray-500 hover:border-red-300 hover:text-red-500 dark:hover:border-red-700/60 dark:hover:text-red-400 transition-all duration-200 disabled:opacity-50"
    >
      מחק
    </button>
  );
}
