export const locales = ["ar", "en", "fr", "tr", "ur", "id"] as const;
export type Locale = (typeof locales)[number];
export const direction = (locale: string) => (["ar", "ur"].includes(locale) ? "rtl" : "ltr");
