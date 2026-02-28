// src/app/admin/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/spinner";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 transition-colors">
      {/* Theme toggle — top left corner */}
      <div className="fixed top-4 left-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800 transition-colors">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌿</div>
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">
            פאנל ניהול
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Body Balance Admin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="שם משתמש"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            disabled={loading}
            placeholder="שם משתמש"
          />

          <Input
            label="סיסמה"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            disabled={loading}
            placeholder="סיסמה"
          />

          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
              ⚠️ {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {loading ? (
              <>
                <Spinner className="size-4" /> מתחבר
              </>
            ) : (
              "התחבר"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
