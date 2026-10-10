import { NextResponse } from "next/server";
import { requireShop } from "@/lib/tenant";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validators";
export async function GET() {
  try {
    const { shop } = await requireShop();
    const products = await db.product.findMany({
      where: { shopId: shop.id },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
}
export async function POST(req: Request) {
  try {
    const { user, shop } = await requireShop();
    const parsed = productSchema.safeParse(await req.json());
    if (!parsed.success)
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "بيانات غير صحيحة" },
        { status: 422 }
      );
    const d = parsed.data;
    if (await db.product.findFirst({ where: { shopId: shop.id, slug: d.slug } }))
      return NextResponse.json({ error: "رابط المنتج مستخدم بالفعل" }, { status: 409 });
    const p = await db.product.create({
      data: {
        shopId: shop.id,
        name: d.name,
        slug: d.slug,
        description: d.description || null,
        sku: d.sku || null,
        barcode: d.barcode || null,
        price: d.price,
        compareAtPrice:
          d.compareAtPrice === "" || d.compareAtPrice === undefined
            ? null
            : Number(d.compareAtPrice),
        stock: d.stock,
        status: d.status,
        imageUrl: d.imageUrl || null,
      },
    });
    await db.activityLog.create({
      data: {
        shopId: shop.id,
        userId: user.id,
        action: "product.created",
        entityType: "Product",
        entityId: p.id,
      },
    });
    return NextResponse.json(p, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "تعذر حفظ المنتج" }, { status: 500 });
  }
}
