// src/components/ui/LeafIcon.tsx
// Reusable leaf brand icon — used in Navbar, AdminHeader, login page, Footer, Hero.

interface LeafIconProps {
  /** Pixel size of the icon width (height scales proportionally 3:4) */
  size?: number;
  /**
   * "green"   — filled leaf, currentColor body, white inner veins. For light backgrounds.
   * "white"   — filled leaf, white body, semi-transparent veins. For green gradient backgrounds.
   * "outline" — stroke-only, no fill, currentColor. For large decorative backgrounds.
   */
  variant?: "green" | "white" | "outline";
  className?: string;
}

export default function LeafIcon({ size = 24, variant = "green", className }: LeafIconProps) {
  const w = size;
  const h = Math.round(size * (4 / 3));
  const isOutline = variant === "outline";
  const isWhite = variant === "white";

  const bodyFill = isOutline ? "none" : isWhite ? "white" : "currentColor";
  const bodyFillOpacity = isOutline ? "0" : isWhite ? "0.92" : "0.9";
  const bodyStroke = isOutline ? "currentColor" : "none";
  const veinColor = isOutline ? "currentColor" : "white";
  const veinOpacity = isWhite ? "0.55" : isOutline ? "0.75" : "0.95";

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 18 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Leaf body — pointed tip at top, rounded base (upward leaf) */}
      <path
        d="M9 1C9 1 1.5 7.5 1 13.5C0.5 19.5 4 22.5 9 23C14 22.5 17.5 19.5 17 13.5C16.5 7.5 9 1 9 1Z"
        fill={bodyFill}
        fillOpacity={bodyFillOpacity}
        stroke={bodyStroke}
        strokeWidth={isOutline ? "1" : "0"}
        strokeOpacity="0.8"
      />
      {/* Central midrib */}
      <path
        d="M9 3 L9 22.5"
        stroke={veinColor}
        strokeOpacity={veinOpacity}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeDasharray="2.5 3"
      />
      {/* Upper lateral veins */}
      <path
        d="M9 9 C9 9 12.5 11 14 13.5"
        stroke={veinColor}
        strokeOpacity={isWhite ? "0.4" : isOutline ? "0.6" : "0.75"}
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      <path
        d="M9 9 C9 9 5.5 11 4 13.5"
        stroke={veinColor}
        strokeOpacity={isWhite ? "0.4" : isOutline ? "0.6" : "0.75"}
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      {/* Lower lateral veins */}
      <path
        d="M9 15 C9 15 12 16.5 13 18.5"
        stroke={veinColor}
        strokeOpacity={isWhite ? "0.3" : isOutline ? "0.5" : "0.6"}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M9 15 C9 15 6 16.5 5 18.5"
        stroke={veinColor}
        strokeOpacity={isWhite ? "0.3" : isOutline ? "0.5" : "0.6"}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
