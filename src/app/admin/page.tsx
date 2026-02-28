"use client";
// src/app/admin/page.tsx — Admin dashboard

import { useState, useEffect, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import MonthPicker from "@/components/ui/MonthPicker";
import TabButton from "@/components/ui/TabButton";
import AdminHeader from "./_components/AdminHeader";
import SearchBar from "./_components/SearchBar";
import SubmissionRow, { type Submission } from "./_components/SubmissionRow";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
type Tab = "unread" | "read";

export default function AdminDashboard() {
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("unread");
  const [items, setItems] = useState<Submission[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // ── Data fetching ───────────────────────────────────────────────────────────

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

  // ── Handlers ────────────────────────────────────────────────────────────────

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

  const handleClearSearch = () => {
    setSearch("");
    setSearchInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      <AdminHeader onLogout={handleLogout} />

      <Tabs defaultValue="submissions">
        {/* ── Top-level tab bar ── */}
        <div
          className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 px-6 pt-4"
          dir="rtl"
        >
          <div className="max-w-6xl mx-auto">
            <TabsList className="h-auto gap-1 bg-transparent p-0 border-0">
              <TabsTrigger
                value="submissions"
                className="relative px-5 py-2.5 rounded-none border-0 bg-transparent text-sm font-semibold text-gray-500 shadow-none
                  data-[state=active]:text-[#4E8B6E] data-[state=active]:bg-transparent data-[state=active]:shadow-none
                  data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-1px]
                  data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px]
                  data-[state=active]:after:bg-[#4E8B6E] data-[state=active]:after:rounded-t-full
                  hover:text-gray-700 dark:text-gray-400 dark:data-[state=active]:text-emerald-400
                  dark:data-[state=active]:after:bg-emerald-400 dark:hover:text-gray-200
                  transition-colors"
              >
                📬 פניות
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="relative px-5 py-2.5 rounded-none border-0 bg-transparent text-sm font-semibold text-gray-500 shadow-none
                  data-[state=active]:text-[#4E8B6E] data-[state=active]:bg-transparent data-[state=active]:shadow-none
                  data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-1px]
                  data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px]
                  data-[state=active]:after:bg-[#4E8B6E] data-[state=active]:after:rounded-t-full
                  hover:text-gray-700 dark:text-gray-400 dark:data-[state=active]:text-emerald-400
                  dark:data-[state=active]:after:bg-emerald-400 dark:hover:text-gray-200
                  transition-colors"
              >
                🛍️ ניהול מוצרים
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ── Submissions tab ── */}
        <TabsContent
          value="submissions"
          className="mt-0 focus-visible:outline-none"
        >
          <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <span className="hidden md:inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <MonthPicker value={month} onChange={setMonth} />
              </span>
              <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                activeSearch={search}
                onSearch={handleSearch}
                onClear={handleClearSearch}
              />
            </div>

            {/* Sub-tabs: לטיפול / טופל */}
            <div className="flex gap-2 mb-6">
              <TabButton
                label="לטיפול"
                count={unreadCount}
                active={tab === "unread"}
                onClick={() => setTab("unread")}
                badgeVariant="danger"
              />
              <TabButton
                label="טופל"
                count={readCount}
                active={tab === "read"}
                onClick={() => setTab("read")}
              />
            </div>
            <div className="mb-4 md:hidden">
              <MonthPicker value={month} onChange={setMonth} />
            </div>

            {/* List */}
            {loading ? (
              <div className="flex justify-center items-center py-16 text-gray-500">
                <Spinner className="size-6" />
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-2xl">
                <div className="text-4xl mb-3">📭</div>
                <p>אין פניות {tab === "unread" ? "לטיפול" : "מטופלות"}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <SubmissionRow
                    key={item.id}
                    item={item}
                    expanded={expandedId === item.id}
                    actionLoading={actionLoading === item.id}
                    onToggleExpand={() =>
                      setExpandedId(expandedId === item.id ? null : item.id)
                    }
                    onToggleRead={() => handleToggleRead(item)}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* ── Products tab ── */}
        <TabsContent
          value="products"
          className="mt-0 focus-visible:outline-none"
        >
          <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-400 dark:text-gray-600">
            <div className="text-5xl mb-4">🛍️</div>
            <p className="text-lg font-semibold">ניהול מוצרים</p>
            <p className="text-sm mt-1">בקרוב...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
