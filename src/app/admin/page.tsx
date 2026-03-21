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
import FaqManager from "./_components/FaqManager";

type Tab = "unread" | "read";

const GREEN = "#4E8B6E";

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ tab });
      if (month) params.set("month", month);
      if (search) params.set("q", search);
      const res = await fetch(`/api/admin/submissions?${params}`);
      if (res.status === 401) { router.push("/admin/login"); return; }
      const data = await res.json();
      setItems(data.items ?? []);
      setUnreadCount(data.unreadCount ?? 0);
      setReadCount(data.readCount ?? 0);
    } finally {
      setLoading(false);
    }
  }, [tab, month, search, router]);

  useEffect(() => { fetchData(); }, [fetchData]);

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

  const handleSearch = (e: FormEvent) => { e.preventDefault(); setSearch(searchInput); };
  const handleClearSearch = () => { setSearch(""); setSearchInput(""); };

  return (
    <div className="min-h-screen">
      <AdminHeader onLogout={handleLogout} />

      <Tabs defaultValue="submissions">
        {/* Top-level tab bar */}
        <div className="bg-white dark:bg-[#161B22] border-b border-gray-200 dark:border-gray-800/70 px-6" dir="rtl">
          <div className="max-w-6xl mx-auto">
            <TabsList className="h-auto gap-0 bg-transparent p-0 border-0">
              {[
                { value: "submissions", label: "פניות", icon: "📬", badge: unreadCount > 0 ? unreadCount : null },
                { value: "faq", label: "שאלות נפוצות", icon: "❓", badge: null },
                { value: "products", label: "ניהול מוצרים", icon: "🛍️", badge: null },
              ].map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className={`
                    relative px-5 py-3.5 rounded-none border-0 bg-transparent text-sm font-semibold shadow-none
                    text-gray-500 dark:text-gray-400
                    data-[state=active]:text-[${GREEN}] data-[state=active]:bg-transparent data-[state=active]:shadow-none
                    data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0
                    data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5
                    data-[state=active]:after:bg-[${GREEN}] data-[state=active]:after:rounded-t
                    hover:text-gray-700 dark:hover:text-gray-200
                    dark:data-[state=active]:text-emerald-400 dark:data-[state=active]:after:bg-emerald-400
                    transition-colors
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{t.icon}</span>
                    {t.label}
                    {t.badge !== null && t.badge > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-white text-[10px] font-bold" style={{ backgroundColor: GREEN }}>
                        {t.badge}
                      </span>
                    )}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {/* Submissions tab */}
        <TabsContent value="submissions" className="mt-0 focus-visible:outline-none">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6" dir="rtl">

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <span className="hidden md:inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MonthPicker value={month} onChange={setMonth} />
              </span>
              <SearchBar value={searchInput} onChange={setSearchInput} activeSearch={search} onSearch={handleSearch} onClear={handleClearSearch} />
            </div>

            {/* Sub-tabs */}
            <div className="flex gap-2 mb-5">
              <TabButton label="לטיפול" count={unreadCount} active={tab === "unread"} onClick={() => setTab("unread")} badgeVariant="danger" />
              <TabButton label="טופל"  count={readCount}  active={tab === "read"}  onClick={() => setTab("read")}  />
            </div>

            <div className="mb-4 md:hidden">
              <MonthPicker value={month} onChange={setMonth} />
            </div>

            {/* List */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Spinner className="size-7 text-gray-400" />
              </div>
            ) : items.length === 0 ? (
              <div className="admin-card text-center py-16">
                <div className="text-5xl mb-3">📭</div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">אין פניות {tab === "unread" ? "לטיפול" : "מטופלות"}</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {items.map((item) => (
                  <SubmissionRow
                    key={item.id}
                    item={item}
                    expanded={expandedId === item.id}
                    actionLoading={actionLoading === item.id}
                    onToggleExpand={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    onToggleRead={() => handleToggleRead(item)}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* FAQ tab */}
        <TabsContent value="faq" className="mt-0 focus-visible:outline-none">
          <FaqManager />
        </TabsContent>

        {/* Products tab */}
        <TabsContent value="products" className="mt-0 focus-visible:outline-none">
          <div className="max-w-6xl mx-auto px-4 py-20 text-center">
            <div className="text-6xl mb-4">🛍️</div>
            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">ניהול מוצרים</p>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">בקרוב...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
