// src/components/ui/Reveal.tsx
// Scroll-triggered reveal wrapper — applies CSS animation when element enters viewport
"use client";

import React, { useRef, useEffect, useState, ElementType } from "react";

type Effect = "fade-up" | "fade-in" | "slide-right" | "slide-left" | "scale-in";

interface RevealProps {
  children: React.ReactNode;
  effect?: Effect;
  /** Delay before animation starts (ms) */
  delay?: number;
  className?: string;
  as?: ElementType;
}

export default function Reveal({
  children,
  effect = "fade-up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${visible ? `reveal-${effect}` : ""} ${className}`}
      style={
        visible
          ? { animationDelay: `${delay}ms`, animationFillMode: "both" }
          : { opacity: 0 }
      }
    >
      {children}
    </Tag>
  );
}
