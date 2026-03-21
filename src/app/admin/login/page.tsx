// src/app/admin/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Spinner } from "@/components/ui/spinner";
import LeafIcon from "@/components/ui/LeafIcon";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error ?? "שגיאת התחברות");
      }
    } catch {
      setError("שגיאת רשת. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0D1117] px-4 transition-colors relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#4E8B6E]/[0.05] dark:bg-[#4E8B6E]/[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-rose-500/[0.04] dark:bg-rose-500/[0.06] blur-[60px] pointer-events-none" />

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Login card */}
      <div className="w-full max-w-sm relative z-10">
        {/* Card */}
        <div className="bg-white dark:bg-[#161B22] rounded-2xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-gray-200/80 dark:border-gray-800/80">

          {/* Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4E8B6E] to-[#3d7459] mb-4 shadow-[0_4px_16px_rgba(78,139,110,0.35)]">
              <LeafIcon size={22} variant="white" />
            </div>
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">פאנל ניהול</h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1 font-medium">Body Balance Admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 tracking-wide">שם משתמש</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                disabled={loading}
                placeholder="שם משתמש"
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 tracking-wide">סיסמה</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={loading}
                placeholder="••••••••"
                className="admin-input"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl px-4 py-3 text-red-600 dark:text-red-400 text-sm">
                <span className="flex-shrink-0">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4E8B6E] to-[#3d7459] hover:from-[#3d7459] hover:to-[#2d5a44] text-white font-bold py-3 rounded-xl shadow-[0_4px_16px_rgba(78,139,110,0.35)] hover:shadow-[0_8px_24px_rgba(78,139,110,0.45)] hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#4E8B6E]/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? <><Spinner className="size-4" /> מתחבר...</> : "התחבר"}
            </button>
          </form>
        </div>

        {/* Bottom hint */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">
          Body Balance © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
