import Link from "next/link";
import { UserRound, LockKeyhole } from "lucide-react";
export default async function Account({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="container py-12">
      <section className="card mx-auto max-w-xl p-7">
        <UserRound size={36} className="text-amber-600" />
        <h1 className="mt-4 text-3xl font-black">حساب العميل</h1>
        <p className="mt-3 leading-7 text-slate-500">
          تسجيل العملاء وسجل الطلبات مرتبطان بخطوة تفعيل حسابات العملاء والتحقق من ملكية الطلب.
        </p>
        <Link href="/login" className="btn btn-primary mt-6">
          <LockKeyhole size={17} /> تسجيل الدخول
        </Link>
        <Link href={`/shop/${slug}`} className="btn btn-soft mr-2 mt-6">
          العودة للمتجر
        </Link>
      </section>
    </main>
  );
}
