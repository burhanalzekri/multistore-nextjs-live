import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
const schema = z.object({
  shopSlug: z.string(),
  customerName: z.string().min(2).max(100),
  customerEmail: z.union([z.string().email(), z.literal("")]).optional(),
  customerPhone: z.string().min(5).max(40),
  items: z
    .array(z.object({ productId: z.string(), quantity: z.number().int().min(1).max(99) }))
    .min(1)
    .max(50),
  paymentMethod: z.enum(["COD", "BANK_TRANSFER"]),
  address: z.string().min(5).max(500),
});
export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success)
      return NextResponse.json({ error: "بيانات الطلب غير مكتملة" }, { status: 422 });
    const d = parsed.data;
    const shop = await db.shop.findFirst({ where: { slug: d.shopSlug, status: "ACTIVE" } });
    if (!shop) return NextResponse.json({ error: "المتجر غير متاح" }, { status: 404 });
    const ids = d.items.map((i) => i.productId);
    const products = await db.product.findMany({
      where: { shopId: shop.id, id: { in: ids }, status: "ACTIVE" },
    });
    if (products.length !== new Set(ids).size)
      return NextResponse.json({ error: "أحد المنتجات غير متاح في هذا المتجر" }, { status: 422 });
    const order = await db.$transaction(async (tx) => {
      let subtotal = 0;
      const items = d.items.map((i) => {
        const p = products.find((p) => p.id === i.productId)!;
        if (p.stock < i.quantity) throw new Error(`المخزون غير كافٍ للمنتج: ${p.name}`);
        subtotal += Number(p.price) * i.quantity;
        return {
          shopId: shop.id,
          productId: p.id,
          productName: p.name,
          sku: p.sku,
          quantity: i.quantity,
          unitPrice: p.price,
          total: Number(p.price) * i.quantity,
        };
      });
      const orderNumber = `MS-${Date.now().toString().slice(-9)}`;
      const created = await tx.order.create({
        data: {
          shopId: shop.id,
          orderNumber,
          status: "PENDING",
          paymentStatus: "UNPAID",
          paymentMethod: d.paymentMethod,
          subtotal,
          total: subtotal,
          currency: shop.currency,
          customerName: d.customerName,
          customerEmail: d.customerEmail || null,
          customerPhone: d.customerPhone,
          shippingAddress: { address: d.address },
          items: { create: items },
        },
      });
      for (const i of d.items)
        await tx.product.update({
          where: { id: i.productId },
          data: { stock: { decrement: i.quantity } },
        });
      return created;
    });
    return NextResponse.json({ ok: true, orderNumber: order.orderNumber }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error:
          e instanceof Error && e.message.startsWith("المخزون") ? e.message : "تعذر إنشاء الطلب",
      },
      { status: 400 }
    );
  }
}
