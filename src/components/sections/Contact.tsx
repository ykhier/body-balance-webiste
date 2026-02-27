// src/components/sections/Contact.tsx
// Contact section with client-side form that calls the API route

"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import VIcon from "../ui/vIcon";
import LoadingIcon from "../ui/LoadingIcon";
import { Input } from "@/components/ui/Input";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

// Field definitions for the form
const FIELDS: {
  name: keyof ContactFormData;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  { name: "name", label: "שם מלא", type: "text", placeholder: "שם מלא" },
  {
    name: "email",
    label: "אימייל",
    type: "email",
    placeholder: "you@example.com",
  },
  { name: "phone", label: "טלפון", type: "tel", placeholder: "050-0000000" },
];

const EMPTY: ContactFormData = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result?.success) {
        setStatus("success");
        setFormData(EMPTY);
      } else {
        setStatus("error");
        setErrorMsg(result?.error ?? "שגיאה לא ידועה. נסי שוב.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setErrorMsg("שגיאה בשליחת הטופס. נסי שוב מאוחר יותר.");
    }
  };

  return (
    <section
      id="contact"
      className="section-padding bg-white dark:bg-gray-900"
      aria-labelledby="contact-heading"
    >
      <div className="section-container max-w-3xl">
        <div data-reveal>
          <SectionTitle
            title="צרו קשר"
            subtitle="יש לכן שאלה? רוצים להתחיל? דברו איתי ישירות 💌"
          />
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div
            role="alert"
            className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-3xl p-10 text-center"
          >
            <div className="flex justify-center mb-4" aria-hidden="true">
              <VIcon name="check" className="w-12 h-12 text-emerald-500" />
            </div>
            <h3 className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 mb-2">
              ההודעה נשלחה בהצלחה!
            </h3>
            <p className="text-emerald-600 dark:text-emerald-300 text-sm leading-relaxed mb-6">
              תודה שפנית, אחזור אליכם בהקדם האפשרי 🌿
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-emerald-600 dark:text-emerald-300 font-semibold underline text-sm hover:text-emerald-800 dark:hover:text-emerald-100"
            >
              שליחת הודעה נוספת
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            data-reveal
            data-from="scale"
            data-delay="80"
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-card border border-gray-100 dark:border-gray-700 p-8"
            aria-label="טופס יצירת קשר"
          >
            {/* Text fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {FIELDS.map((field) => (
                <div
                  key={field.name}
                  className={field.name === "phone" ? "sm:col-span-1" : ""}
                >
                  <Input
                    label={field.label}
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    disabled={status === "loading"}
                    labelClassName="form-label"
                    inputClassName="form-input disabled:opacity-60"
                    autoComplete={
                      field.name === "email"
                        ? "email"
                        : field.name === "name"
                          ? "name"
                          : "tel"
                    }
                  />
                </div>
              ))}
            </div>

            {/* Message textarea */}
            <div className="mb-6">
              <label htmlFor="message" className="form-label">
                הודעה
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="כתוב/י כאן את הודעתך..."
                required
                disabled={status === "loading"}
                className="form-input resize-none disabled:opacity-60"
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <div
                role="alert"
                className="mb-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 rounded-xl px-4 py-3 text-rose-600 dark:text-rose-400 text-sm"
              >
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-l from-rose-500 to-rose-400 text-white font-bold
                py-3.5 rounded-2xl shadow-soft hover:shadow-lg hover:-translate-y-0.5
                transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-rose-200
                disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 text-base"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingIcon />
                  שולח...
                </span>
              ) : (
                "שלחי הודעה 📩"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
