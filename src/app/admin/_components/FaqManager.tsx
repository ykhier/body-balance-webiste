// src/app/admin/_components/FaqManager.tsx
// Full CRUD UI for managing bilingual FAQ items (Hebrew + Arabic).

"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import FaqForm from "./faq/FaqForm";
import FaqCard from "./faq/FaqCard";
import { emptyForm } from "./faq/types";
import type { FaqItem, FormState } from "./faq/types";

export default function FaqManager() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [movingId, setMovingId] = useState<number | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faq");
      const data = await res.json();
      setItems(data.items ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openNew = () => {
    setForm(emptyForm);
    setEditingId("new");
  };

  const openEdit = (item: FaqItem) => {
    setForm({
      questionHe: item.questionHe,
      answerHe: item.answerHe,
      questionAr: item.questionAr,
      answerAr: item.answerAr,
    });
    setEditingId(item.id);
  };

  const cancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const save = async () => {
    const { questionHe, answerHe, questionAr, answerAr } = form;
    if (!questionHe.trim() || !answerHe.trim() || !questionAr.trim() || !answerAr.trim())
      return;

    setSaving(true);
    try {
      if (editingId === "new") {
        await fetch("/api/admin/faq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/admin/faq", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
      }
      setEditingId(null);
      setForm(emptyForm);
      await fetchItems();
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm("למחוק את השאלה הזו?")) return;
    setDeletingId(id);
    try {
      await fetch("/api/admin/faq", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await fetchItems();
    } finally {
      setDeletingId(null);
    }
  };

  const moveItem = async (id: number, dir: "up" | "down") => {
    const idx = items.findIndex((i) => i.id === id);
    if (dir === "up" && idx === 0) return;
    if (dir === "down" && idx === items.length - 1) return;

    const swapIdx = dir === "up" ? idx - 1 : idx + 1;
    const newItems = [...items];
    [newItems[idx], newItems[swapIdx]] = [newItems[swapIdx], newItems[idx]];

    setItems(newItems);
    setMovingId(id);
    try {
      await fetch("/api/admin/faq", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updates: newItems.map((item, i) => ({ id: item.id, order: i })),
        }),
      });
    } finally {
      setMovingId(null);
    }
  };

  const GREEN = "#4E8B6E";

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            שאלות נפוצות
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {loading ? "טוען..." : `${items.length} שאלות מוצגות באתר`}
          </p>
        </div>
        <button
          onClick={openNew}
          disabled={editingId !== null}
          className="flex items-center gap-1.5 px-4 py-2 text-white rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50"
          style={{ background: `linear-gradient(135deg, ${GREEN}, #3d7459)`, boxShadow: `0 2px 10px ${GREEN}40` }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
          </svg>
          הוסף שאלה
        </button>
      </div>

      {/* New-item form */}
      {editingId === "new" && (
        <FaqForm
          form={form}
          onChange={setForm}
          onSave={save}
          onCancel={cancel}
          saving={saving}
          isNew
        />
      )}

      {/* List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Spinner className="size-6 text-gray-400" />
          <p className="text-sm text-gray-400 dark:text-gray-500">טוען שאלות...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="admin-card text-center py-16">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl" style={{ background: `${GREEN}15` }}>
            ❓
          </div>
          <p className="font-semibold text-gray-600 dark:text-gray-300">אין שאלות עדיין</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">לחץ/י על &quot;הוסף שאלה&quot; כדי להתחיל</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) =>
            editingId === item.id ? (
              <FaqForm
                key={item.id}
                form={form}
                onChange={setForm}
                onSave={save}
                onCancel={cancel}
                saving={saving}
              />
            ) : (
              <FaqCard
                key={item.id}
                item={item}
                idx={idx}
                total={items.length}
                onEdit={() => openEdit(item)}
                onDelete={() => deleteItem(item.id)}
                onMove={(dir) => moveItem(item.id, dir)}
                deleting={deletingId === item.id}
                moving={movingId === item.id}
                disabled={editingId !== null}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}
