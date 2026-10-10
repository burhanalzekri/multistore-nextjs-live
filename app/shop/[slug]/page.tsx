import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatMoney } from "@/lib/currency";
import { Store, ShoppingBag, Search } from "lucide-react";
import { CartButton } from "@/components/store-cart";
export default async function StorePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { slug } = await params;
  const { q = "" } = await searchParams;
  const shop = await db.shop.findFirst({ where: { slug, status: "ACTIVE" } });
  if (!shop) notFound();
  const products = await db.product.findMany({
    where: {
      shopId: shop.id,
      status: "ACTIVE",
      ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 48,
  });
  return (
    <main
      style={
        {
          "--primary": shop.primaryColor,
          "--primary-2": shop.secondaryColor,
        } as React.CSSProperties
      }
    >
      <header className="glass sticky top-0 z-30">
        <div className="container flex h-20 items-center justify-between gap-3">
          <Link href={`/shop/${shop.slug}`} className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-500 text-white">
              <Store />
            </span>
            <span>
              <b className="block text-lg">{shop.name}</b>
              <small className="text-slate-500">متجر إلكتروني</small>
            </span>
          </Link>
          <form className="hidden max-w-md flex-1 items-center gap-2 rounded-xl border bg-white px-3 py-2 md:flex">
            <Search size={18} className="text-slate-400" />
            <input
              className="min-w-0 flex-1 outline-none"
              name="q"
              defaultValue={q}
              placeholder="ابحث عن منتج..."
            />
            <button className="btn btn-primary py-2">بحث</button>
          </form>
          <CartButton shopId={shop.id} />
        </div>
      </header>
      <section className="bg-gradient-to-l from-amber-100 via-orange-50 to-white py-14">
        <div className="container">
          <span className="eyebrow">مرحبًا بك في متجرنا</span>
          <h1 className="mt-4 text-4xl font-black">{shop.name}</h1>
          <p className="mt-3 max-w-2xl leading-8 text-slate-600">
            {shop.description || "اكتشف منتجاتنا المختارة بعناية وتسوق بسهولة وأمان."}
          </p>
          <form className="mt-5 flex max-w-md gap-2 md:hidden">
            <input className="field" name="q" placeholder="ابحث عن منتج..." defaultValue={q} />
            <button className="btn btn-primary">بحث</button>
          </form>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black">منتجات المتجر</h2>
              <p className="mt-1 text-sm text-slate-500">{products.length} منتج</p>
            </div>
          </div>
          {products.length ? (
            <div className="grid-products">
              {products.map((p) => (
                <article className="card overflow-hidden p-3" key={p.id}>
                  <Link href={`/shop/${shop.slug}/product/${p.slug}`}>
                    <div className="product-image">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} loading="lazy" />
                      ) : (
                        <ShoppingBag size={36} className="text-amber-500" />
                      )}
                    </div>
                    <h3 className="mt-3 line-clamp-2 font-extrabold">{p.name}</h3>
                  </Link>
                  <b className="mt-2 block text-lg">
                    {formatMoney(p.price.toString(), {
                      code: shop.currency,
                      symbol: shop.currencySymbol,
                      position: shop.currencyPosition as any,
                      decimals: shop.decimals as any,
                    })}
                  </b>
                  <p className="mt-1 text-xs text-slate-500">
                    {p.stock > 0 ? "متوفر" : "نفد المخزون"}
                  </p>
                  <CartButton
                    shopId={shop.id}
                    product={{
                      id: p.id,
                      name: p.name,
                      price: Number(p.price),
                      imageUrl: p.imageUrl,
                    }}
                  />
                </article>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <ShoppingBag className="mx-auto text-amber-500" size={40} />
              <h3 className="mt-4 text-xl font-black">لا توجد منتجات معروضة</h3>
              <p className="mt-2 text-slate-500">سيتم عرض المنتجات المنشورة هنا.</p>
            </div>
          )}
        </div>
      </section>
      <footer className="border-t bg-white py-8">
        <div className="container flex flex-wrap justify-between gap-3 text-sm text-slate-500">
          <span>
            {shop.name} © {new Date().getFullYear()}
          </span>
          <span>
            {shop.contactEmail || ""} {shop.phone ? `· ${shop.phone}` : ""}
          </span>
          <Link href={`/shop/${shop.slug}/page/privacy`}>الخصوصية</Link>
        </div>
      </footer>
    </main>
  );
}
