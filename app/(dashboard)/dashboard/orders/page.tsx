import { requireShop } from "@/lib/tenant";
import { db } from "@/lib/db";
import { ShoppingCart } from "lucide-react";

export default async function Page() {
  const { shop } = await requireShop();
  let count = 0;
  try {
    count = await db.order.count({ where: { shopId: shop.id } });
  } catch {}

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <ShoppingCart className="text-green-600" />
          الطلبات
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          عدد طلبات: <b className="text-green-700">{count}</b>
        </p>
      </div>

      <div className="card p-6">
        <p className="text-slate-600">
          صفحة الطلبات قيد التطوير. يمكنك حالياً إدارة طلبات
          من صفحة المنتجات.
        </p>
      </div>
    </>
  );
}
