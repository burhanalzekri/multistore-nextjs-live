export type CurrencyConfig = {
  code: string;
  symbol: string;
  position?: "before" | "after";
  decimals?: 0 | 2 | 3;
  locale?: string;
};
export function formatMoney(
  amount: number | string | { toString(): string },
  c: CurrencyConfig = { code: "USD", symbol: "$", position: "before", decimals: 2, locale: "en-US" }
) {
  const n = Number(amount);
  const formatted = new Intl.NumberFormat(c.locale || "en-US", {
    minimumFractionDigits: c.decimals ?? 2,
    maximumFractionDigits: c.decimals ?? 2,
  }).format(Number.isFinite(n) ? n : 0);
  return c.position === "after" ? `${formatted} ${c.symbol}` : `${c.symbol}${formatted}`;
}
