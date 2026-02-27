// src/components/ui/Button.tsx
// Reusable button with primary / outline variants

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
  asChild?: boolean;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-4 px-8 py-3 text-base cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-l from-rose-500 to-rose-400 text-white shadow-soft hover:shadow-lg hover:-translate-y-0.5 focus:ring-rose-200",
    outline:
      "border-2 border-rose-400 text-rose-500 bg-transparent hover:bg-rose-50 focus:ring-rose-100",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
