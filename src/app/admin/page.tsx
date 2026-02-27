"use client";
// src/app/admin/page.tsx — Admin dashboard

import { useState, useEffect, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";

type Submission = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
  handledAt: string | null;
};

type Tab = "unread" | "read";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("unread");
  const [items, setItems] = useState<Submission[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(getCurrentMonth());
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ tab });
      if (month) params.set("month", month);
      if (search) params.set("q", search);

      const res = await fetch(`/api/admin/submissions?${params}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setItems(data.items ?? []);
      setUnreadCount(data.unreadCount ?? 0);
      setReadCount(data.readCount ?? 0);
    } finally {
      setLoading(false);
    }
  }, [tab, month, search, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggleRead = async (item: Submission) => {
    setActionLoading(item.id);
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, read: !item.read }),
    });
    setActionLoading(null);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("האם למחוק את הפנייה?")) return;
    setActionLoading(id);
    await fetch("/api/admin/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setActionLoading(null);
    fetchData();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌿</span>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">פאנל ניהול</h1>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              Body Balance Admin
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium
              text-[#4E8B6E] border border-[#4E8B6E]/40 bg-[#4E8B6E]/5
              hover:bg-[#4E8B6E] hover:text-white hover:border-[#4E8B6E]
              dark:text-emerald-400 dark:border-emerald-700 dark:bg-emerald-900/10
              dark:hover:bg-emerald-600 dark:hover:text-white dark:hover:border-emerald-600
              px-3 py-1.5 rounded-lg transition-all duration-200"
            title="פתח את האתר בחלון חדש"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            האתר
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors border border-gray-300 hover:border-red-300 dark:text-gray-400 dark:border-gray-700 dark:hover:text-red-400 dark:hover:border-red-800 px-3 py-1.5 rounded-lg"
          >
            יציאה
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Month picker */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              חודש:
            </label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E8B6E]"
            />
            <button
              onClick={() => setMonth("")}
              className="text-xs text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
            >
              הצג הכל
            </button>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex gap-2 flex-1 min-w-[200px]"
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="חיפוש לפי שם / אימייל / טלפון..."
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4E8B6E]"
            />
            <button
              type="submit"
              className="bg-[#4E8B6E] hover:bg-[#3d7059] px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              חפש
            </button>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                }}
                className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-white px-2"
              >
                נקה
              </button>
            )}
          </form>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("unread")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === "unread"
                ? "bg-[#4E8B6E] text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            לטיפול
            {unreadCount > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === "unread" ? "bg-white/20" : "bg-red-500 text-white"}`}
              >
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("read")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === "read"
                ? "bg-[#4E8B6E] text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            טופל
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${tab === "read" ? "bg-white/20" : "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}
            >
              {readCount}
            </span>
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">טוען...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-gray-500 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-2xl">
            <div className="text-4xl mb-3">📭</div>
            <p>אין פניות {tab === "unread" ? "לטיפול" : "מטופלות"}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-2xl overflow-hidden"
              >
                {/* Row header */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  onClick={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                >
                  <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {item.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.phone}
                    </p>
                  </div>

                  {/* Actions */}
                  <div
                    className="flex items-center gap-2 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleToggleRead(item)}
                      disabled={actionLoading === item.id}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors disabled:opacity-50 ${
                        item.read
                          ? "border-gray-400 text-gray-500 hover:border-[#4E8B6E] hover:text-[#4E8B6E] dark:border-gray-600 dark:text-gray-400"
                          : "border-[#4E8B6E] text-[#4E8B6E] hover:bg-[#4E8B6E] hover:text-white"
                      }`}
                    >
                      {actionLoading === item.id
                        ? "..."
                        : item.read
                          ? "החזר לטיפול"
                          : "סמן כטופל"}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={actionLoading === item.id}
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-500 dark:border-gray-700 dark:text-gray-500 dark:hover:border-red-700 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                    >
                      מחק
                    </button>
                    <span className="text-gray-400 dark:text-gray-600 text-xs">
                      {expandedId === item.id ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* Expanded message */}
                {expandedId === item.id && (
                  <div className="px-5 pb-5 border-t border-gray-200 dark:border-gray-800 pt-4">
                    <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">
                      הודעה
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap leading-relaxed bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                      {item.message}
                    </p>
                    {item.handledAt && (
                      <p className="text-xs text-gray-500 mt-3">
                        טופל בתאריך: {formatDate(item.handledAt)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
