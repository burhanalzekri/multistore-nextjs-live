"use client";
import { FormEvent, useState } from "react";
import { Save, Palette, Globe, Phone, Truck, Search, ShieldCheck } from "lucide-react";
import { useModal } from "@/components/modal-provider";
type S = Record<string, string | number | boolean>;
export function SettingsForm({ shop }: { shop: S }) {
  const [busy, setBusy] = useState(false);
  const { notify } = useModal();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const body: Record<string, unknown> = Object.fromEntries(f);
    body.taxInclusive = f.get("taxInclusive") === "on";
    body.decimals = Number(body.decimals);
    try {
      const r = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "تعذر حفظ الإعدادات");
      notify({ type: "success", title: "تم حفظ الإعدادات", message: "تم تحديث إعدادات متجرك." });
      location.reload();
    } catch (err) {
      notify({
        type: "error",
        title: "تعذر الحفظ",
        message: err instanceof Error ? err.message : "حدث خطأ",
      });
    } finally {
      setBusy(false);
    }
  }
  const field = (
    name: string,
    label: string,
    type = "text",
    extra: Record<string, unknown> = {}
  ) => (
    <label className="text-sm font-bold">
      {label}
      <input
        className="field mt-2"
        name={name}
        type={type}
        defaultValue={String(shop[name] ?? "")}
        {...extra}
      />
    </label>
  );
  return (
    <form onSubmit={submit} className="space-y-5">
      <section className="card p-5 md:p-7">
        <h2 className="mb-5 flex items-center gap-2 text-lg font-black">
          <Palette className="text-amber-600" /> الهوية الأساسية والمظهر
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {field("name", "اسم المتجر")}
          {field("slug", "الرابط (Slug)", "text", { pattern: "[a-z0-9]+(-[a-z0-9]+)*" })}
          {field("description", "وصف المتجر")}
          {field("primaryColor", "اللون الأساسي", "color", { className: "field mt-2 h-12 p-1" })}
          {field("secondaryColor", "اللون الثانوي", "color", { className: "field mt-2 h-12 p-1" })}
        </div>
      </section>
      <section className="card p-5 md:p-7">
        <h2 className="mb-5 flex items-center gap-2 text-lg font-black">
          <Phone className="text-amber-600" /> التواصل والعنوان
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {field("contactEmail", "البريد الإلكتروني", "email")}
          {field("phone", "رقم الهاتف", "tel")}
          {field("whatsapp", "واتساب", "tel")}
          {field("address", "العنوان")}
          {field("city", "المدينة")}
          {field("region", "المحافظة / المنطقة")}
          {field("country", "رمز الدولة")}
          {field("googleMapsUrl", "رابط خرائط Google", "url")}
        </div>
      </section>
      <section className="card p-5 md:p-7">
        <h2 className="mb-5 flex items-center gap-2 text-lg font-black">
          <Globe className="text-amber-600" /> الإعدادات الإقليمية
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-bold">
            العملة
            <select className="field mt-2" name="currency" defaultValue={String(shop.currency)}>
              {[
                "USD",
                "EUR",
                "GBP",
                "SAR",
                "AED",
                "EGP",
                "YER",
                "KWD",
                "QAR",
                "OMR",
                "BHD",
                "JOD",
                "TRY",
                "INR",
                "PKR",
                "IDR",
                "MAD",
                "TND",
                "LYD",
                "SDG",
                "NGN",
                "KES",
                "ZAR",
                "CAD",
                "AUD",
                "JPY",
                "CNY",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          {field("currencySymbol", "رمز العملة")}
          {field("currencyPosition", "موضع الرمز: before أو after")}
          <label className="text-sm font-bold">
            المنازل العشرية
            <select className="field mt-2" name="decimals" defaultValue={String(shop.decimals)}>
              <option value="0">0</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
          <label className="text-sm font-bold">
            اللغة الافتراضية
            <select name="language" className="field mt-2" defaultValue={String(shop.language)}>
              {[
                ["ar", "العربية"],
                ["en", "English"],
                ["fr", "Français"],
                ["tr", "Türkçe"],
                ["ur", "اردو"],
                ["id", "Bahasa Indonesia"],
              ].map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-bold">
            اتجاه العرض
            <select name="direction" className="field mt-2" defaultValue={String(shop.direction)}>
              <option value="rtl">RTL — من اليمين لليسار</option>
              <option value="ltr">LTR — من اليسار لليمين</option>
              <option value="auto">تلقائي</option>
            </select>
          </label>
          {field("timezone", "المنطقة الزمنية", "text", { placeholder: "Asia/Aden" })}
          <label className="text-sm font-bold">
            التقويم
            <select className="field mt-2" name="calendar" defaultValue="gregorian">
              <option value="gregorian">ميلادي</option>
              <option value="hijri">هجري</option>
              <option value="both">كلاهما</option>
            </select>
          </label>
          <label className="text-sm font-bold">
            نظام القياس
            <select className="field mt-2" name="units" defaultValue="metric">
              <option value="metric">متري</option>
              <option value="imperial">إمبراطوري</option>
            </select>
          </label>
        </div>
      </section>
      <section className="card p-5 md:p-7">
        <h2 className="mb-5 flex items-center gap-2 text-lg font-black">
          <Truck className="text-amber-600" /> الضرائب والبيع
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {field("taxName", "اسم الضريبة")}
          {field("taxPercent", "نسبة الضريبة %", "number", { min: 0, max: 100, step: 0.01 })}
          <label className="flex items-center gap-3 text-sm font-bold md:col-span-2">
            <input
              type="checkbox"
              name="taxInclusive"
              defaultChecked={Boolean(shop.taxInclusive)}
            />{" "}
            السعر شامل الضريبة
          </label>
        </div>
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-900">
          إعدادات الشحن ووسائل الدفع تعرض في هذه النسخة كقاعدة بيانات قابلة للتوسعة؛ لا تُفعّل بوابة
          دفع حقيقية قبل إضافة مزودها ومفاتيحه السرية والتحقق من Webhooks.
        </p>
      </section>
      <section className="card p-5 md:p-7">
        <h2 className="mb-5 flex items-center gap-2 text-lg font-black">
          <Search className="text-amber-600" /> تحسين محركات البحث
        </h2>
        <div className="grid gap-4">
          {field("seoTitle", "عنوان SEO")}
          {field("seoDescription", "وصف SEO")}
        </div>
      </section>
      <button disabled={busy} className="btn btn-primary">
        <Save size={18} />
        {busy ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
      </button>
    </form>
  );
}
