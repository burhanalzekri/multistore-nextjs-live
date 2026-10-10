"use client";
import Link from "next/link";
import { FormEvent } from "react";
import { useModal } from "@/components/modal-provider";
export default function Forgot() {
  const { notify } = useModal();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    notify({
      type: "info",
      title: "استعادة كلمة المرور",
      message: "إرسال رابط الاستعادة يحتاج إعداد مزود البريد الإلكتروني؛ لم يتم إرسال رسالة فعلية.",
    });
  }
  return (
    <main className="grid min-h-screen place-items-center p-5">
      <section className="card w-full max-w-md p-7">
        <span className="eyebrow">مساعدة الحساب</span>
        <h1 className="mt-4 text-3xl font-black">نسيت كلمة المرور؟</h1>
        <p className="mt-3 leading-7 text-slate-500">أدخل بريدك الإلكتروني لبدء عملية الاستعادة.</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm font-bold">
            البريد الإلكتروني
            <input className="field mt-2" type="email" required />
          </label>
          <button className="btn btn-primary w-full">طلب رابط الاستعادة</button>
        </form>
        <Link className="mt-5 block text-center text-sm font-bold text-amber-700" href="/login">
          العودة لتسجيل الدخول
        </Link>
      </section>
    </main>
  );
}
