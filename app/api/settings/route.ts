import { NextResponse } from "next/server";
import { requireShop } from "@/lib/tenant";
import { db } from "@/lib/db";
import { z } from "zod";
const schema = z.object({
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(1000).optional(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  contactEmail: z.union([z.string().email(), z.literal("")]).optional(),
  phone: z.string().max(40).optional(),
  whatsapp: z.string().max(40).optional(),
  address: z.string().max(300).optional(),
  city: z.string().max(100).optional(),
  region: z.string().max(100).optional(),
  country: z.string().min(2).max(3),
  googleMapsUrl: z.union([z.string().url(), z.literal("")]).optional(),
  currency: z.string().length(3),
  currencySymbol: z.string().max(8),
  currencyPosition: z.enum(["before", "after"]),
  decimals: z
    .number()
    .int()
    .refine((v) => [0, 2, 3].includes(v)),
  language: z.enum(["ar", "en", "fr", "tr", "ur", "id"]),
  direction: z.enum(["rtl", "ltr", "auto"]),
  timezone: z.string().max(100),
  calendar: z.enum(["gregorian", "hijri", "both"]).optional(),
  units: z.enum(["metric", "imperial"]).optional(),
  taxName: z.string().max(80).optional(),
  taxPercent: z.coerce.number().min(0).max(100).optional(),
  taxInclusive: z.boolean().optional(),
  seoTitle: z.string().max(200).optional(),
  seoDescription: z.string().max(500).optional(),
});
export async function PATCH(req: Request) {
  try {
    const { shop, user } = await requireShop();
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success)
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "بيانات غير صحيحة" },
        { status: 422 }
      );
    const d = parsed.data;
    const collision = await db.shop.findFirst({ where: { slug: d.slug, id: { not: shop.id } } });
    if (collision) return NextResponse.json({ error: "رابط المتجر مستخدم" }, { status: 409 });
    await db.shop.update({
      where: { id: shop.id },
      data: { ...d, contactEmail: d.contactEmail || null, googleMapsUrl: d.googleMapsUrl || null },
    });
    await db.activityLog.create({
      data: {
        shopId: shop.id,
        userId: user.id,
        action: "shop.settings.updated",
        entityType: "Shop",
        entityId: shop.id,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "تعذر حفظ الإعدادات" }, { status: 500 });
  }
}
