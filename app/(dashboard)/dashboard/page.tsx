import Link from "next/link";
import { db } from "@/lib/db";
import { requireShop } from "@/lib/tenant";
import { formatMoney } from "@/lib/currency";
import { ArrowUpLeft, Package, ShoppingCart, Users, Wallet, Clock3 } from "lucide-react";
export default async function DashboardHome() {
  const { shop } = await requireShop();
  const [products, orders, customers, latest, paid] = await Promise.all([
    db.product.count({ where: { shopId: shop.id } }),
    db.order.count({ where: { shopId: shop.id } }),
    db.customer.count({ where: { shopId: shop.id } }),
    db.order.findMany({ where: { shopId: shop.id }, orderBy: { createdAt: "desc" }, take: 6 }),
    db.order.aggregate({
      where: { shopId: shop.id, paymentStatus: "PAID" },
      _sum: { total: true },
    }),
  ]);
  const money = paid._sum.total?.toString() || "0";
  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">لوحة التحكم</span>
          <h1 className="mt-3 text-3xl font-black">مرحبًا بك في {shop.name}</h1>
          <p className="mt-2 text-slate-500">إليك ملخص نشاط متجرك.</p>
        </div>
        <Link href="/dashboard/products/new" className="btn btn-primary">
          <Package size={18} /> أضف منتجًا
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { t: "المنتجات", n: products, Icon: Package, c: "bg-amber-100 text-amber-700" },
          { t: "الطلبات", n: orders, Icon: ShoppingCart, c: "bg-blue-100 text-blue-700" },
          { t: "العملاء", n: customers, Icon: Users, c: "bg-green-100 text-green-700" },
          {
            t: "المبيعات المدفوعة",
            n: formatMoney(money, {
              code: shop.currency,
              symbol: shop.currencySymbol,
              position: shop.currencyPosition as any,
              decimals: shop.decimals as any,
            }),
            Icon: Wallet,
            c: "bg-violet-100 text-violet-700",
          },
        ].map((x) => (
          <div className="card p-5" key={x.t}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{x.t}</span>
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${x.c}`}>
                <x.Icon size={20} />
              </span>
            </div>
            <b className="mt-4 block text-2xl">{x.n}</b>
            <span className="mt-2 block text-xs text-slate-400">بيانات المتجر الحالية</span>
          </div>
        ))}
      </div>
      <div className="mt-7 grid gap-5 xl:grid-cols-[1.4fr_.6fr]">
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <h2 className="text-lg font-black">أحدث الطلبات</h2>
              <p className="mt-1 text-sm text-slate-500">آخر الطلبات المسجلة في متجرك</p>
            </div>
            <Link
              href="/dashboard/orders"
              className="flex items-center gap-1 text-sm font-bold text-amber-700"
            >
              عرض الكل <ArrowUpLeft size={16} />
            </Link>
          </div>
          {latest.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="p-4">رقم الطلب</th>
                    <th className="p-4">العميل</th>
                    <th className="p-4">الإجمالي</th>
                    <th className="p-4">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {latest.map((o) => (
                    <tr className="border-t" key={o.id}>
                      <td className="p-4 font-bold">#{o.orderNumber}</td>
                      <td className="p-4">{o.customerName}</td>
                      <td className="p-4">
                        {formatMoney(o.total.toString(), {
                          code: o.currency,
                          symbol: shop.currencySymbol,
                        })}
                      </td>
                      <td className="p-4">
                        <span className="pill pill-amber">{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
                <ShoppingCart />
              </span>
              <h3 className="mt-4 font-bold">لا توجد طلبات حتى الآن</h3>
              <p className="mt-2 text-sm text-slate-500">ستظهر الطلبات هنا بمجرد بدء البيع.</p>
            </div>
          )}
        </section>
        <section className="card p-5">
          <h2 className="text-lg font-black">ابدأ من هنا</h2>
          <p className="mt-1 text-sm text-slate-500">خطوات لتجهيز متجرك.</p>
          <div className="mt-5 space-y-3">
            {[
              { t: "أضف منتجاتك", d: "أسماء وأسعار وصور", href: "/dashboard/products" },
              {
                t: "خصص إعدادات المتجر",
                d: "العملة والتواصل والمظهر",
                href: "/dashboard/settings",
              },
              {
                t: "راجع التصنيفات",
                d: "رتب المنتجات لتسهيل التصفح",
                href: "/dashboard/categories",
              },
            ].map((a) => (
              <Link
                href={a.href}
                key={a.t}
                className="flex items-center justify-between rounded-2xl border p-4 hover:border-amber-300"
              >
                <div>
                  <b className="block text-sm">{a.t}</b>
                  <span className="mt-1 block text-xs text-slate-500">{a.d}</span>
                </div>
                <ArrowUpLeft size={18} className="text-amber-600" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
