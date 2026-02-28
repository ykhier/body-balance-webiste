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
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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

export default function SubmissionRow({
  item,
  expanded,
  actionLoading,
  onToggleExpand,
  onToggleRead,
  onDelete,
}: SubmissionRowProps) {
  return (
    <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-2xl overflow-hidden">
      {/* ── Row header ── */}
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={onToggleExpand}
      >
        {/* Desktop: 3-column grid  |  Mobile: name + date only */}
        <div className="flex-1 min-w-0">
          {/* Desktop grid (hidden on mobile) */}
          <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4">
            <div>
              <p className="font-bold text-gray-900 dark:text-white truncate">
                {item.name}
              </p>
              <p className="text-xs text-gray-400">
                {formatDate(item.createdAt)}
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate self-center">
              {item.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 self-center">
              {item.phone}
            </p>
          </div>

          {/* Mobile: name + date only */}
          <div className="sm:hidden">
            <p className="font-bold text-gray-900 dark:text-white truncate">
              {item.name}
            </p>
            <p className="text-xs text-gray-400">
              {formatDate(item.createdAt)}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="flex items-center gap-2 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <ToggleReadButton
            item={item}
            loading={actionLoading}
            onClick={onToggleRead}
          />
          <DeleteButton loading={actionLoading} onClick={onDelete} />
          <span className="text-gray-400 dark:text-gray-600 text-xs">
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {/* ── Expanded content ── */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-200 dark:border-gray-800 pt-4 space-y-4">
          {/* Mobile: email + phone cards */}
          <div className="sm:hidden flex flex-col gap-3">
            <a
              href={`tel:${item.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#4E8B6E]/10 transition-colors"
            >
              <span className="text-base shrink-0">📞</span>
              <span className="font-medium">{item.phone}</span>
            </a>
            <a
              href={`mailto:${item.email}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#4E8B6E]/10 transition-colors"
            >
              <span className="text-base shrink-0">✉️</span>
              <span className="font-medium break-all">{item.email}</span>
            </a>
          </div>

          {/* Message */}
          <div>
            <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">
              הודעה
            </p>
            <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap leading-relaxed bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
              {item.message}
            </p>
          </div>

          {item.handledAt && (
            <p className="text-xs text-gray-500">
              טופל בתאריך: {formatDate(item.handledAt)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ToggleReadButton({
  item,
  loading,
  onClick,
}: {
  item: Submission;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors disabled:opacity-50 ${
        item.read
          ? "border-gray-400 text-gray-500 hover:border-[#4E8B6E] hover:text-[#4E8B6E] dark:border-gray-600 dark:text-gray-400"
          : "border-[#4E8B6E] text-[#4E8B6E] hover:bg-[#4E8B6E] hover:text-white"
      }`}
    >
      {loading ? "..." : item.read ? "החזר לטיפול" : "סמן כטופל"}
    </button>
  );
}

function DeleteButton({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="text-xs px-3 py-1.5 rounded-lg border
        border-gray-300 text-gray-400
        hover:border-red-400 hover:text-red-500
        dark:border-gray-700 dark:text-gray-500
        dark:hover:border-red-700 dark:hover:text-red-400
        transition-colors disabled:opacity-50"
    >
      מחק
    </button>
  );
}
