import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatMoney } from "@/lib/currency";
import { Store, ArrowRight, ShoppingBag } from "lucide-react";
import { CartButton } from "@/components/store-cart";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  const { slug, productSlug } = await params;
  const shop = await db.shop.findFirst({ where: { slug, status: "ACTIVE" } });
  if (!shop) notFound();
  const p = await db.product.findFirst({
    where: { shopId: shop.id, slug: productSlug, status: "ACTIVE" },
  });
  if (!p) notFound();
  return (
    <main className="min-h-screen py-8">
      <div className="container">
        <Link
          href={`/shop/${shop.slug}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-amber-700"
        >
          <ArrowRight size={16} /> العودة إلى {shop.name}
        </Link>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="product-image card min-h-72 p-5">
            {p.imageUrl ? (
              <img src={p.imageUrl} alt={p.name} />
            ) : (
              <ShoppingBag size={60} className="text-amber-500" />
            )}
          </div>
          <section className="card p-6 md:p-8">
            <span className="eyebrow">منتج من {shop.name}</span>
            <h1 className="mt-4 text-3xl font-black">{p.name}</h1>
            <p className="mt-4 whitespace-pre-line leading-8 text-slate-600">
              {p.description || "منتج مختار بعناية."}
            </p>
            <b className="mt-6 block text-3xl">
              {formatMoney(p.price.toString(), {
                code: shop.currency,
                symbol: shop.currencySymbol,
                position: shop.currencyPosition as any,
                decimals: shop.decimals as any,
              })}
            </b>
            <p className="mt-2 text-sm text-slate-500">
              {p.stock > 0 ? `متوفر — ${p.stock} قطعة` : "نفد المخزون"}
            </p>
            {p.stock > 0 && (
              <CartButton
                shopId={shop.id}
                product={{ id: p.id, name: p.name, price: Number(p.price), imageUrl: p.imageUrl }}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
