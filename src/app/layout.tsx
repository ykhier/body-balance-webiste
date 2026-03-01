// src/app/layout.tsx
// Root layout — sets RTL direction, Hebrew font, and metadata

import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import ScrollAnimations from "@/components/ui/ScrollAnimations";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "בראאה חיר | ליווי תזונאי אישי",
  description:
    "בראאה חיר – מאמנת תזונה מוסמכת עם ניסיון של שנתיים. תוכניות תזונה אישיות, ליווי יומי וסגנון חיים בריא ללא ויתורים.",
  keywords: ["תזונה", "דיאטה", "ירידה במשקל", "ליווי תזונאי", "בראאה חיר"],
  openGraph: {
    title: "בראאה חיר | ליווי תזונאי אישי",
    description: "תוכניות תזונה אישיות וליווי יומי לאורח חיים בריא",
    locale: "he_IL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // dir="rtl" + lang="he" for full RTL & Hebrew support
    <html lang="he" dir="rtl" suppressHydrationWarning className={rubik.variable}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>"
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ScrollAnimations />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
