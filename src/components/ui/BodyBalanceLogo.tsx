// src/components/ui/BodyBalanceLogo.tsx
// Animated SVG logo — leaf draws itself on mount, then wordmark fades in
"use client";

import React from "react";

interface Props {
  /** Height of the mark in px; wordmark scales proportionally */
  size?: number;
  /** Whether to run the mount animation */
  animated?: boolean;
  className?: string;
}

export default function BodyBalanceLogo({
  size = 38,
  animated = true,
  className = "",
}: Props) {
  const id = React.useId().replace(/:/g, "");

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* ── SVG Mark ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={animated ? "logo-mark" : ""}
      >
        <defs>
          <linearGradient id={`lg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft glow behind leaf */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill={`url(#glow-${id})`}
          className={animated ? "logo-glow" : ""}
        />

        {/* Leaf outline — draws itself */}
        <path
          d="M20 5 C28 5 36 11 36 21 C36 31 28 36 20 36 C12 36 4 29 4 19 C4 10 12 5 20 5 Z"
          stroke={`url(#lg-${id})`}
          strokeWidth="2"
          fill="none"
          pathLength="1"
          className={animated ? "logo-leaf-stroke" : ""}
          style={animated ? { strokeDasharray: 1, strokeDashoffset: 1 } : {}}
        />

        {/* Leaf fill — fades in after stroke */}
        <path
          d="M20 5 C28 5 36 11 36 21 C36 31 28 36 20 36 C12 36 4 29 4 19 C4 10 12 5 20 5 Z"
          fill={`url(#lg-${id})`}
          className={animated ? "logo-leaf-fill" : ""}
          style={animated ? { opacity: 0 } : {}}
        />

        {/* Centre vein — vertical */}
        <line
          x1="20" y1="8" x2="20" y2="34"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="1"
          className={animated ? "logo-vein-v" : ""}
          style={animated ? { strokeDasharray: 1, strokeDashoffset: 1 } : {}}
        />

        {/* Side vein — left */}
        <path
          d="M20 19 Q14 17 8 20"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          pathLength="1"
          className={animated ? "logo-vein-l" : ""}
          style={animated ? { strokeDasharray: 1, strokeDashoffset: 1 } : {}}
        />

        {/* Side vein — right */}
        <path
          d="M20 24 Q26 22 32 25"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          pathLength="1"
          className={animated ? "logo-vein-r" : ""}
          style={animated ? { strokeDasharray: 1, strokeDashoffset: 1 } : {}}
        />
      </svg>

      {/* ── Wordmark ── */}
      <span
        className={`font-extrabold tracking-wide leading-none select-none ${
          animated ? "logo-wordmark" : ""
        }`}
        style={{ fontSize: size * 0.52 }}
      >
        <span className="text-rose-500">BODY</span>
        <span className="text-gray-700 dark:text-gray-100"> BALANCE</span>
      </span>
    </div>
  );
}
