"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Store, LockKeyhole } from "lucide-react";
import { useModal } from "@/components/modal-provider";
export default function Login() {
  const [busy, setBusy] = useState(false);
  const { notify } = useModal();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = new FormData(e.currentTarget);
    try {
      const r = await signIn("credentials", {
        email: f.get("email"),
        password: f.get("password"),
        redirect: false,
      });
      if (r?.error)
        notify({
          type: "error",
          title: "تعذر تسجيل الدخول",
          message: "تحقق من البريد الإلكتروني وكلمة المرور أو حالة الحساب.",
        });
      else location.href = "/dashboard";
    } catch {
      notify({ type: "error", title: "خطأ في الاتصال", message: "تعذر إكمال الطلب، حاول مجددًا." });
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-gradient-to-br from-amber-500 via-orange-500 to-orange-700 p-12 text-white lg:flex">
        <Link href="/" className="text-2xl font-black">
          MultiStore
        </Link>
        <div>
          <Store size={44} />
          <h1 className="mt-6 text-4xl font-black leading-relaxed">كل متاجرك، في مكان واحد.</h1>
          <p className="mt-4 max-w-md leading-8 text-white/85">
            إدارة واضحة وتجربة تجارة إلكترونية مصممة للنمو.
          </p>
        </div>
        <span className="text-sm text-white/75">منصة MultiStore</span>
      </section>
      <section className="grid place-items-center p-5">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-2 text-xl font-black lg:hidden">
            <Store className="text-amber-600" /> MultiStore
          </Link>
          <span className="eyebrow">مرحبًا بعودتك</span>
          <h2 className="mt-4 text-3xl font-black">تسجيل الدخول</h2>
          <p className="mt-2 text-slate-500">أدخل بيانات حسابك للمتابعة إلى لوحة التحكم.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block text-sm font-bold">
              البريد الإلكتروني
              <input
                className="field mt-2"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm font-bold">
              كلمة المرور
              <input
                className="field mt-2"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••"
              />
            </label>
            <button disabled={busy} className="btn btn-primary w-full py-3">
              {busy ? (
                <>
                  <LockKeyhole size={17} /> جارٍ التحقق...
                </>
              ) : (
                "دخول إلى حسابك"
              )}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            ليس لديك حساب؟{" "}
            <Link className="font-extrabold text-amber-700" href="/register">
              أنشئ حسابًا جديدًا
            </Link>
          </p>
          <p className="mt-4 text-center text-xs text-slate-400">
            تسجيل الدخول يتطلب إعداد قاعدة البيانات وبيانات الحساب.
          </p>
        </div>
      </section>
    </main>
  );
}
