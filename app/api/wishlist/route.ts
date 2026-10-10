import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
const schema = z.object({
  shopSlug: z.string(),
  customerKey: z.string().min(8).max(120),
  productId: z.string(),
});
export async function POST(req: Request) {
  try {
    const p = schema.safeParse(await req.json());
    if (!p.success) return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 422 });
    const { shopSlug, customerKey, productId } = p.data;
    const shop = await db.shop.findFirst({ where: { slug: shopSlug, status: "ACTIVE" } });
    if (!shop) return NextResponse.json({ error: "المتجر غير موجود" }, { status: 404 });
    const product = await db.product.findFirst({
      where: { id: productId, shopId: shop.id, status: "ACTIVE" },
    });
    if (!product) return NextResponse.json({ error: "المنتج غير متاح" }, { status: 404 });
    const row = await db.wishlist.upsert({
      where: { shopId_customerKey_productId: { shopId: shop.id, customerKey, productId } },
      update: {},
      create: { shopId: shop.id, customerKey, productId },
    });
    return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "تعذر حفظ قائمة الرغبات" }, { status: 500 });
  }
}
