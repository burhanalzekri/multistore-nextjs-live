import { requireShop } from "@/lib/tenant";
import { db } from "@/lib/db";
import {
  Package,
  ShoppingCart,
  Users,
  Tags,
  MessageSquare,
  ChartNoAxesCombined,
  TicketPercent,
  PanelsTopLeft,
} from "lucide-react";
const Icon = ShoppingCart;
export default async function Page() {
  const { shop } = await requireShop();
  let count = 0;
  try {
    switch ("orders") {
      case "orders":
        count = await db.order.count({ where: { shopId: shop.id } });
        break;
      case "categories":
        count = await db.category.count({ where: { shopId: shop.id } });
        break;
      case "customers":
        count = await db.customer.count({ where: { shopId: shop.id } });
        break;
      case "coupons":
        count = await db.coupon.count({ where: { shopId: shop.id } });
        break;
      case "messages":
        count = await db.smsLog.count({ where: { shopId: shop.id } });
        break;
      default:
        count = 0;
    }
  } catch {}
  return (
    <>
      <div className="mb-6">
        <span className="eyebrow">إدارة المتجر</span>
        <h1 className="mt-3 text-3xl font-black">الطلبات</h1>
        <p className="mt-2 text-slate-500">إدارة حالات الطلبات ومتابعة التنفيذ.</p>
      </div>
      <div className="card p-8">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-amber-700">
          <Icon size={26} />
        </div>
        <div className="mt-5 text-3xl font-black">{count}</div>
        <p className="mt-2 text-slate-500">سجلات مرتبطة بمتجرك</p>
        <div className="mt-6 rounded-2xl border border-dashed p-5">
          <b>واجهة الوحدة جاهزة — العمليات المتقدمة تحتاج استكمالًا واختبارات</b>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            تم تجهيز جداول قاعدة البيانات والعزل حسب shopId لهذه الوحدة. لا تعتبر عمليات الدفع
            والإرسال الخارجي أو التصدير جاهزة للإنتاج حتى يتم إعداد المزود واختبار حالات النجاح
            والفشل.
          </p>
        </div>
      </div>
    </>
  );
}
