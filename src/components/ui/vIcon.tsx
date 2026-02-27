export default function VIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16"
    >
      <circle
        cx="28"
        cy="28"
        r="28"
        className="fill-[#4E8B6E]/15 dark:fill-[#4E8B6E]/25"
      />
      <circle
        cx="28"
        cy="28"
        r="20"
        className="fill-[#4E8B6E]/25 dark:fill-[#4E8B6E]/40"
      />
      <path
        d="M18 28.5L24.5 35L38 21"
        stroke="#4E8B6E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
