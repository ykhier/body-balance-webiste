// Pure data — no JSX, no imports

export const PLAN_FEATURES = [
  "תוכנית תזונה אישית מותאמת",
  "ליווי שוטף בוואטסאפ",
  "תמיכה מלאה לאורך התהליך",
  "תפריט גמיש ומותאם",
];

export type Plan = {
  id: string;
  tabLabel: string;
  price: number;
  perMonth?: number;
  save?: number;
  popular?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "1m",
    tabLabel: "חודש",
    price: 350,
  },
  {
    id: "2m",
    tabLabel: "חודשיים",
    price: 650,
    perMonth: 325,
    save: 50,
    popular: true,
  },
  {
    id: "3m",
    tabLabel: "3 חודשים",
    price: 900,
    perMonth: 300,
    save: 150,
  },
];
