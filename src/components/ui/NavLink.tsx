"use client";

import React from "react";

export const NAV_LINKS = [
  { label: "ראשי", href: "#hero" },
  { label: "אודות", href: "#about" },
  { label: "קהלי יעד", href: "#audience" },
  { label: "שירותים", href: "#services" },
  { label: "תשלום", href: "#payment" },
  { label: "צרו קשר", href: "#contact" },
];

export default function NavLink({
  href,
  label,
  onClick,
  mobile = false,
  footer = false,
}: {
  href: string;
  label: string;
  onClick?: (href: string) => void;
  mobile?: boolean;
  footer?: boolean;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const className = footer
    ? "text-gray-400 hover:text-rose-400 transition-colors text-sm"
    : mobile
      ? "text-gray-700 dark:text-gray-200 font-semibold hover:text-rose-500 transition-colors py-1"
      : "text-gray-600 dark:text-gray-300 font-medium hover:text-rose-500 transition-colors text-sm";

  return (
    <a href={href} onClick={handleClick} className={className}>
      {label}
    </a>
  );
}

export function NavLinks({
  onClick,
  mobile = false,
  footer = false,
  skip,
}: {
  onClick?: (href: string) => void;
  mobile?: boolean;
  footer?: boolean;
  skip?: string;
}) {
  return (
    <>
      {NAV_LINKS.filter((l) => l.href !== skip).map((link) => (
        <NavLink
          key={link.href}
          {...link}
          onClick={onClick}
          mobile={mobile}
          footer={footer}
        />
      ))}
    </>
  );
}
