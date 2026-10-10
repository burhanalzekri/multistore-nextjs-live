import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
export default async function StorePageContent({
  params,
}: {
  params: Promise<{ slug: string; pageSlug: string }>;
}) {
  const { slug, pageSlug } = await params;
  const shop = await db.shop.findFirst({ where: { slug, status: "ACTIVE" } });
  if (!shop) notFound();
  const page = await db.storePage.findFirst({
    where: { shopId: shop.id, slug: pageSlug, isPublished: true },
  });
  if (!page) notFound();
  return (
    <main className="container py-10">
      <Link className="text-amber-700" href={`/shop/${slug}`}>
        ← العودة للمتجر
      </Link>
      <article className="card mt-5 p-6 md:p-10">
        <h1 className="text-3xl font-black">{page.title}</h1>
        <div className="mt-6 whitespace-pre-wrap leading-8 text-slate-600">{page.body}</div>
      </article>
    </main>
  );
}
