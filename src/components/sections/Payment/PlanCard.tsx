import BitIcon from "@/components/ui/BitIcon";
import VIcon from "@/components/ui/vIcon";
import { type Plan, PLAN_FEATURES } from "./plans";

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-card border border-rose-200 dark:border-gray-700">
      {/* "Most popular" badge */}
      {plan.popular && (
        <div className="absolute top-4 end-4 z-20">
          <span className="bg-white/25 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
            הכי פופולרי ✨
          </span>
        </div>
      )}

      {/* Coloured top band */}
      <div className="bg-gradient-to-l from-rose-400 to-rose-600 px-8 pt-8 pb-14 text-center">
        <p className="text-rose-100 text-sm font-medium mb-2">
          תוכנית תזונה אישית
        </p>

        <div className="flex items-end justify-center gap-1">
          <span className="text-white text-6xl font-black leading-none">
            ₪{plan.price}
          </span>
          <span className="text-white text-xl font-bold mb-2 opacity-80">
            / {plan.tabLabel}
          </span>
        </div>

        <p className="text-rose-200 text-xs mt-2">
          {plan.perMonth
            ? `₪${plan.perMonth} לחודש בלבד · חסכי ₪${plan.save}`
            : "ללא התחייבות"}
        </p>
      </div>

      {/* Bit logo centred on the band seam */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[185px] z-10">
        <div className="bg-white dark:bg-gray-900 rounded-full p-1.5 shadow-lg">
          <div className="bg-rose-500 rounded-full w-14 h-14 flex items-center justify-center">
            <BitIcon size={36} aria-label="ביט" />
          </div>
        </div>
      </div>

      {/* White bottom */}
      <div className="bg-white dark:bg-gray-800 px-8 pt-14 pb-8">
        <ul className="space-y-3 mb-6">
          {PLAN_FEATURES.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"
            >
              <VIcon name="check" className="w-5 h-5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <button className="w-full btn-primary text-white font-extrabold text-lg py-4 rounded-2xl shadow-md flex items-center justify-center gap-3 cursor-pointer">
          <BitIcon size={26} />
          שלמי עכשיו בביט
        </button>
      </div>
    </div>
  );
}
