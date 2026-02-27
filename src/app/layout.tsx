// src/app/layout.tsx
// Root layout — sets RTL direction, Hebrew font, and metadata

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

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
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
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
