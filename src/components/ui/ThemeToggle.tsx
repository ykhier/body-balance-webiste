"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Before hydration: show Moon (light mode default) — no layout shift
  const isDark = mounted && theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "עבור למצב בהיר" : "עבור למצב כהה"}
      className="relative w-9 h-9 flex items-center justify-center rounded-full
                 bg-rose-50 border border-rose-100
                 hover:bg-rose-100 transition-all duration-300
                 focus:outline-none focus:ring-2 focus:ring-rose-300"
      style={{
        backgroundColor: isDark ? "#1f2937" : undefined,
        borderColor: isDark ? "#374151" : undefined,
      }}
    >
      {/* Sun — visible in dark mode */}
      <span
        style={{
          position: "absolute",
          transition: "all 0.3s",
          opacity: isDark ? 1 : 0,
          transform: isDark
            ? "rotate(0deg) scale(1)"
            : "rotate(90deg) scale(0.5)",
        }}
      >
        <Sun style={{ width: 16, height: 16, color: "#facc15" }} />
      </span>

      {/* Moon — visible in light mode */}
      <span
        style={{
          position: "absolute",
          transition: "all 0.3s",
          opacity: isDark ? 0 : 1,
          transform: isDark
            ? "rotate(-90deg) scale(0.5)"
            : "rotate(0deg) scale(1)",
        }}
      >
        <Moon style={{ width: 16, height: 16, color: "#4E8B6E" }} />
      </span>
    </button>
  );
}
