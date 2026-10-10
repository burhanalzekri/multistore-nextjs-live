import { db } from "@/lib/db";
export default async function AdminHome() {
  const [users, shops, products, orders] = await Promise.all([
    db.user.count(),
    db.shop.count(),
    db.product.count(),
    db.order.count(),
  ]);
  return (
    <>
      <span className="eyebrow">إدارة المنصة</span>
      <h1 className="mt-3 text-3xl font-black">نظرة عامة</h1>
      <p className="mt-2 text-slate-500">مؤشرات النظام العامة.</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["المستخدمون", users],
          ["المتاجر", shops],
          ["المنتجات", products],
          ["الطلبات", orders],
        ].map(([t, n]) => (
          <div className="card p-6" key={String(t)}>
            <p className="text-sm text-slate-500">{t}</p>
            <b className="mt-3 block text-3xl">{n}</b>
          </div>
        ))}
      </div>
      <div className="card mt-7 p-6">
        <h2 className="text-lg font-black">حالة التشغيل</h2>
        <p className="mt-2 leading-7 text-slate-500">
          هذه لوحة إحصائية أولية. تهيئة البريد والنسخ الاحتياطية والمراقبة والدفع تتطلب ربط الخدمات
          الفعلية قبل إطلاقها.
        </p>
      </div>
    </>
  );
}
