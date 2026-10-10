import Link from "next/link";
import { requireUser } from "@/lib/tenant";
import { db } from "@/lib/db";
export default async function Shops() {
  const u = await requireUser();
  const shops = await db.shopMember.findMany({ where: { userId: u.id }, include: { shop: true } });
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-black">متاجري</h1>
      <p className="mt-2 text-slate-500">اختر المتجر الذي تريد إدارته.</p>
      <div className="mt-6 space-y-3">
        {shops.map((m) => (
          <Link key={m.id} href="/dashboard" className="card flex items-center justify-between p-5">
            <div>
              <b>{m.shop.name}</b>
              <p className="mt-1 text-sm text-slate-500">
                /{m.shop.slug} · {m.role}
              </p>
            </div>
            <span className="pill pill-green">{m.shop.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
