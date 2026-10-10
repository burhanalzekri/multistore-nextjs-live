import { NextResponse } from "next/server";
import { requireShop } from "@/lib/tenant";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validators";
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { shop, user } = await requireShop();
    const { id } = await params;
    const parsed = productSchema.safeParse(await req.json());
    if (!parsed.success)
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "بيانات غير صحيحة" },
        { status: 422 }
      );
    const exists = await db.product.findFirst({ where: { id, shopId: shop.id } });
    if (!exists) return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    const d = parsed.data;
    const collision = await db.product.findFirst({
      where: { shopId: shop.id, slug: d.slug, id: { not: id } },
    });
    if (collision) return NextResponse.json({ error: "الرابط مستخدم بالفعل" }, { status: 409 });
    const p = await db.product.update({
      where: { id },
      data: {
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
        action: "product.updated",
        entityType: "Product",
        entityId: id,
      },
    });
    return NextResponse.json(p);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "تعذر تحديث المنتج" }, { status: 500 });
  }
}
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { shop, user } = await requireShop();
    const { id } = await params;
    const p = await db.product.findFirst({ where: { id, shopId: shop.id } });
    if (!p) return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    await db.product.delete({ where: { id } });
    await db.activityLog.create({
      data: {
        shopId: shop.id,
        userId: user.id,
        action: "product.deleted",
        entityType: "Product",
        entityId: id,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "تعذر حذف المنتج" }, { status: 500 });
  }
}
