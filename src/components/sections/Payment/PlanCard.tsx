"use client";

import { type Plan } from "./plans";
import { useT } from "@/contexts/LanguageContext";

const GREEN = "#4E8B6E";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill={GREEN} fillOpacity="0.15" />
      <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function PlanCard({ plan, tabLabel }: { plan: Plan; tabLabel: string }) {
  const t = useT();
  const p = t.payment;

  return (
    <div className="relative rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800/60 shadow-[0_8px_40px_rgba(78,139,110,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] bg-white dark:bg-[#161B22] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_60px_rgba(78,139,110,0.20)] dark:hover:shadow-[0_16px_60px_rgba(0,0,0,0.6)]">
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-4 end-4 z-20">
          <span className="text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.2)" }}>
            {p.popular}
          </span>
        </div>
      )}

      {/* Coloured top band */}
      <div
        className="px-8 pt-8 pb-14 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${GREEN}, #3d7459)` }}
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        <p className="text-white/70 text-xs font-semibold mb-3 tracking-wider uppercase">{p.planTitle}</p>

        <div className="flex items-end justify-center gap-1 relative">
          <span className="text-white font-black leading-none" style={{ fontSize: "3.75rem" }}>
            ₪{plan.price}
          </span>
          <span className="text-white/60 text-lg font-semibold mb-2">/ {tabLabel}</span>
        </div>

        {plan.perMonth ? (
          <p className="text-white/60 text-xs mt-2 relative">{p.perMonthSave(plan.perMonth, plan.save!)}</p>
        ) : (
          <p className="text-white/60 text-xs mt-2 relative">{p.noCommitment}</p>
        )}
      </div>

      {/* WhatsApp icon on the seam */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[185px] z-10">
        <div className="bg-white dark:bg-[#161B22] rounded-full p-1.5 shadow-lg">
          <div className="rounded-full w-14 h-14 flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${GREEN}, #3d7459)` }}>
            <WhatsAppIcon size={30} />
          </div>
        </div>
      </div>

      {/* Features + CTA */}
      <div className="px-8 pt-14 pb-8 bg-white dark:bg-[#161B22]">
        <ul className="space-y-3 mb-7">
          {p.features.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <CheckIcon />
              {item}
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/972542576613?text=${encodeURIComponent(p.whatsappMessage(tabLabel, plan.price))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-white font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          style={{ background: `linear-gradient(135deg, ${GREEN}, #3d7459)`, boxShadow: `0 4px 16px ${GREEN}50` }}
        >
          <WhatsAppIcon size={22} />
          {p.payButton}
        </a>
      </div>
    </div>
  );
}
