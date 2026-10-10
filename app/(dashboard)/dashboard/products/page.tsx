import Link from "next/link";
import { db } from "@/lib/db";
import { requireShop } from "@/lib/tenant";
import { formatMoney } from "@/lib/currency";
import { Plus, Package, Search, ExternalLink } from "lucide-react";
import { ProductDeleteButton } from "@/components/product-delete-button";
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { shop } = await requireShop();
  const { q = "" } = await searchParams;
  const products = await db.product.findMany({
    where: {
      shopId: shop.id,
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { sku: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">كتالوج المتجر</span>
          <h1 className="mt-3 text-3xl font-black">المنتجات</h1>
          <p className="mt-2 text-slate-500">{products.length} منتج ضمن النتائج الحالية</p>
        </div>
        <Link className="btn btn-primary" href="/dashboard/products/new">
          <Plus size={18} /> إضافة منتج
        </Link>
      </div>
      <form className="card mb-5 flex gap-2 p-3">
        <Search className="my-auto text-slate-400" />
        <input
          className="min-w-0 flex-1 bg-transparent outline-none"
          name="q"
          defaultValue={q}
          placeholder="ابحث باسم المنتج أو SKU"
        />
        <button className="btn btn-soft">بحث</button>
      </form>
      {products.length ? (
        <div className="grid-products">
          {products.map((p) => (
            <article key={p.id} className="card overflow-hidden p-3">
              <div className="product-image">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} loading="lazy" onError={undefined} />
                ) : (
                  <Package size={38} className="text-amber-400" />
                )}
              </div>
              <div className="px-1 pt-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="line-clamp-2 font-extrabold">{p.name}</h2>
                  <span className={`pill ${p.status === "ACTIVE" ? "pill-green" : "pill-amber"}`}>
                    {p.status === "ACTIVE" ? "نشط" : p.status === "DRAFT" ? "مسودة" : "مؤرشف"}
                  </span>
                </div>
                <b className="mt-2 block text-lg">
                  {formatMoney(p.price.toString(), {
                    code: shop.currency,
                    symbol: shop.currencySymbol,
                    position: shop.currencyPosition as any,
                    decimals: shop.decimals as any,
                  })}
                </b>
                <p className="mt-1 text-xs text-slate-500">
                  المخزون: {p.stock} {p.sku ? `· SKU: ${p.sku}` : ""}
                </p>
                <div className="mt-3 flex gap-2">
                  <Link href={`/dashboard/products/${p.id}/edit`} className="btn btn-soft flex-1">
                    تعديل
                  </Link>
                  <ProductDeleteButton id={p.id} name={p.name} />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <Package size={44} className="mx-auto text-amber-500" />
          <h2 className="mt-4 text-xl font-black">لا توجد منتجات بعد</h2>
          <p className="mt-2 text-slate-500">أضف أول منتج ليظهر في قائمة المنتجات.</p>
          <Link href="/dashboard/products/new" className="btn btn-primary mt-5">
            <Plus size={17} /> إضافة أول منتج
          </Link>
        </div>
      )}
    </>
  );
}
