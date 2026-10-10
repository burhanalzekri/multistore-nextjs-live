"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { useModal } from "@/components/modal-provider";
export default function Track({ params }: { params: Promise<{ slug: string }> }) {
  const [order, setOrder] = useState("");
  const { notify } = useModal();
  async function submit(e: FormEvent) {
    e.preventDefault();
    notify({
      type: "info",
      title: "تتبع الطلب",
      message: "سيتم تفعيل التتبع عند ربط رقم الطلب برقم الهاتف والتحقق الآمن من بيانات الطلب.",
    });
  }
  return (
    <main className="container py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-amber-700">
        <ArrowRight size={16} /> الرئيسية
      </Link>
      <section className="card mx-auto mt-8 max-w-lg p-7">
        <span className="eyebrow">خدمة العملاء</span>
        <h1 className="mt-4 text-3xl font-black">تتبع طلبك</h1>
        <p className="mt-3 text-slate-500">أدخل رقم الطلب لمعرفة آخر تحديث.</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <input
            className="field"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            required
            placeholder="مثال: MS-123456789"
          />
          <button className="btn btn-primary w-full">
            <Search size={17} /> تتبع الطلب
          </button>
        </form>
      </section>
    </main>
  );
}
