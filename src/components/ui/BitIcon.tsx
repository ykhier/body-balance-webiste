export default function BitIcon({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle cx="50" cy="50" r="50" fill="white" />
      <text
        x="50%"
        y="59%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="46"
        fontWeight="900"
        fill="#4E8B6E"
        fontFamily="Arial, sans-serif"
      >
        bit
      </text>
    </svg>
  );
}
