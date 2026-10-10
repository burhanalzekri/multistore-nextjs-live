import Link from "next/link";
export default function Reset() {
  return (
    <main className="grid min-h-screen place-items-center p-5">
      <section className="card w-full max-w-md p-7">
        <span className="eyebrow">أمان الحساب</span>
        <h1 className="mt-4 text-3xl font-black">إعادة تعيين كلمة المرور</h1>
        <p className="mt-3 leading-7 text-slate-500">
          واجهة الاستعادة موجودة، لكن التحقق من رمز البريد وتغيير كلمة المرور يحتاجان إعداد البريد
          وتخزين رموز الاستعادة قبل الاستخدام.
        </p>
        <Link href="/login" className="btn btn-primary mt-6 w-full">
          العودة لتسجيل الدخول
        </Link>
      </section>
    </main>
  );
}
