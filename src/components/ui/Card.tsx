// src/components/ui/Card.tsx
// Generic pastel card wrapper

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={`bg-white dark:bg-gray-800 rounded-3xl shadow-card p-6
        ${hover ? "transition-all duration-300 hover:shadow-soft hover:-translate-y-1" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
}
