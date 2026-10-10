"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { Store, ArrowLeft } from "lucide-react";
import { useModal } from "@/components/modal-provider";
export default function Register() {
  const [busy, setBusy] = useState(false);
  const { notify } = useModal();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(f)),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "تعذر إنشاء الحساب");
      notify({
        type: "success",
        title: "تم إنشاء الحساب",
        message: "تم تجهيز حسابك ومتجرك. سجل الدخول للمتابعة.",
      });
      location.href = "/login";
    } catch (err) {
      notify({
        type: "error",
        title: "لم يكتمل التسجيل",
        message: err instanceof Error ? err.message : "حدث خطأ غير متوقع",
      });
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="grid min-h-screen lg:grid-cols-[.8fr_1.2fr]">
      <aside className="hidden flex-col justify-between bg-gradient-to-br from-amber-500 to-orange-700 p-12 text-white lg:flex">
        <Link href="/" className="text-2xl font-black">
          MultiStore
        </Link>
        <div>
          <span className="text-sm font-bold text-white/80">خطوة أولى نحو مشروعك</span>
          <h1 className="mt-4 text-4xl font-black leading-relaxed">
            أنشئ متجرك، وابدأ تنظيم تجارتك.
          </h1>
          <p className="mt-4 leading-8 text-white/80">
            أضف المنتجات، خصص إعدادات المتجر، وتابع طلباتك من لوحة موحدة.
          </p>
        </div>
        <span className="text-sm text-white/70">إعداد سريع · تجربة عربية · تصميم متجاوب</span>
      </aside>
      <section className="grid place-items-center p-5 py-12">
        <div className="w-full max-w-xl">
          <Link href="/" className="mb-7 flex items-center gap-2 text-xl font-black lg:hidden">
            <Store className="text-amber-600" /> MultiStore
          </Link>
          <span className="eyebrow">حساب جديد</span>
          <h2 className="mt-4 text-3xl font-black">ابدأ بإنشاء متجرك</h2>
          <p className="mt-2 text-slate-500">
            أكمل المعلومات التالية لتهيئة حساب المالك والمتجر الأول.
          </p>
          <form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold">
              الاسم الكامل
              <input name="name" className="field mt-2" minLength={2} required />
            </label>
            <label className="text-sm font-bold">
              البريد الإلكتروني
              <input name="email" type="email" className="field mt-2" required />
            </label>
            <label className="text-sm font-bold sm:col-span-2">
              كلمة المرور <span className="font-normal text-slate-400">(10 أحرف على الأقل)</span>
              <input
                name="password"
                type="password"
                className="field mt-2"
                minLength={10}
                required
                autoComplete="new-password"
              />
            </label>
            <label className="text-sm font-bold">
              اسم المتجر
              <input name="shopName" className="field mt-2" minLength={2} required />
            </label>
            <label className="text-sm font-bold">
              رابط المتجر (slug)
              <input
                name="slug"
                className="field mt-2"
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                placeholder="my-store"
                minLength={3}
                required
              />
              <small className="mt-1 block text-slate-400">
                أحرف إنجليزية صغيرة وأرقام وشرطة فقط
              </small>
            </label>
            <button disabled={busy} className="btn btn-primary mt-2 py-3 sm:col-span-2">
              {busy ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب والمتجر"}
              <ArrowLeft size={17} />
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            لديك حساب؟{" "}
            <Link href="/login" className="font-extrabold text-amber-700">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
