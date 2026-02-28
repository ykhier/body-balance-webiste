// src/components/ui/TabButton.tsx

interface TabButtonProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  /** "danger" = badge is red when inactive and hidden when count=0; "neutral" = badge is always shown in gray */
  badgeVariant?: "danger" | "neutral";
}

export default function TabButton({
  label,
  count,
  active,
  onClick,
  badgeVariant = "neutral",
}: TabButtonProps) {
  const showBadge = badgeVariant === "danger" ? count > 0 : true;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
        active
          ? "bg-[#4E8B6E] text-white"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
      }`}
    >
      {label}
      {showBadge && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            active
              ? "bg-white/20"
              : badgeVariant === "danger"
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
