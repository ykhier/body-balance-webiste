// src/components/sections/Payment.tsx
"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";

const PAYMENT_METHODS = [
  { id: "bit", label: "ביט", icon: "📱" },
  { id: "credit", label: "כרטיס אשראי", icon: "💳" },
];

export default function Payment() {
  const [plan, setPlan] = useState<"single" | "installments">("single");
  const [paymentMethod, setPaymentMethod] = useState("bit");

  const price = plan === "single" ? 490 : 260;
  const total = plan === "single" ? 490 : 520;

  const availableMethods =
    plan === "single"
      ? PAYMENT_METHODS
      : PAYMENT_METHODS.filter((m) => m.id !== "bit");

  return (
    <section
      id="payment"
      className="section-padding bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-900"
      aria-labelledby="payment-heading"
    >
      <div className="section-container max-w-xl mx-auto">
        <div data-reveal>
          <SectionTitle
            title="תשלום"
            subtitle="השקעה בבריאות שלך - פשוט, מהיר ובטוח"
          />
        </div>

        <div
          data-reveal
          data-delay="80"
          className="flex gap-4 mb-6 justify-center"
        >
          <button
            className={`flex-1 py-3 rounded-2xl font-bold border-2 transition-all ${plan === "single" ? "bg-rose-500 text-white border-rose-500 shadow" : "bg-white dark:bg-gray-800 text-rose-500 border-rose-200 dark:border-gray-600 hover:border-rose-400"}`}
            onClick={() => setPlan("single")}
          >
            תשלום חד-פעמי
            <br />
            <span className="text-xl">₪490</span>
          </button>
          <button
            className={`flex-1 py-3 rounded-2xl font-bold border-2 transition-all ${plan === "installments" ? "bg-rose-500 text-white border-rose-500 shadow" : "bg-white dark:bg-gray-800 text-rose-500 border-rose-200 dark:border-gray-600 hover:border-rose-400"}`}
            onClick={() => {
              setPlan("installments");
              setPaymentMethod("credit");
            }}
          >
            2 תשלומים
            <br />
            <span className="text-xl">₪260 × 2</span>
          </button>
        </div>

        <div
          data-reveal
          data-delay="180"
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-card mb-6"
        >
          <p className="font-bold text-gray-700 dark:text-gray-200 mb-4">
            אמצעי תשלום
          </p>
          <div className="flex gap-4">
            {availableMethods.map((m) => (
              <label
                key={m.id}
                className={`flex-1 flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === m.id ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20" : "border-gray-200 dark:border-gray-600 hover:border-rose-200"}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  checked={paymentMethod === m.id}
                  onChange={() => setPaymentMethod(m.id)}
                  className="accent-rose-500"
                />
                <span className="text-2xl">{m.icon}</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {m.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div
          data-reveal
          data-delay="260"
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-card mb-6"
        >
          <p className="font-bold text-gray-700 dark:text-gray-200 mb-4 text-lg">
            סיכום הזמנה
          </p>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>תוכנית תזונה אישית</span>
            <span>
              ₪{price}
              {plan === "installments" ? " × 2" : ""}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>ליווי שוטף + תמיכה</span>
            <span>כלול</span>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between font-extrabold text-gray-800 dark:text-white text-lg">
            <span>סה"כ</span>
            <span className="text-rose-500">₪{total}</span>
          </div>
        </div>

        <div data-reveal data-delay="320">
          <button
            onClick={() => alert("מעביר לדף התשלום...")}
            className="w-full btn-primary text-lg py-4"
          >
            לתשלום מאובטח →
          </button>
        </div>
      </div>
    </section>
  );
}
