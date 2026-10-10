import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validators";
import { hash } from "bcryptjs";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "البيانات غير صحيحة" },
        { status: 422 }
      );
    const d = parsed.data;
    const [emailExists, slugExists] = await Promise.all([
      db.user.findUnique({ where: { email: d.email.toLowerCase() } }),
      db.shop.findUnique({ where: { slug: d.slug } }),
    ]);
    if (emailExists)
      return NextResponse.json({ error: "البريد الإلكتروني مسجل مسبقًا" }, { status: 409 });
    if (slugExists)
      return NextResponse.json({ error: "رابط المتجر مستخدم، اختر رابطًا آخر" }, { status: 409 });
    const result = await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: d.name,
          email: d.email.toLowerCase(),
          passwordHash: await hash(d.password, 12),
          role: "SHOP_OWNER",
        },
      });
      const shop = await tx.shop.create({
        data: {
          name: d.shopName,
          slug: d.slug,
          status: "ACTIVE",
          contactEmail: d.email.toLowerCase(),
          members: { create: { userId: user.id, role: "SHOP_OWNER" } },
        },
      });
      await tx.activityLog.create({
        data: {
          shopId: shop.id,
          userId: user.id,
          action: "shop.created",
          entityType: "Shop",
          entityId: shop.id,
        },
      });
      return { userId: user.id, shopId: shop.id };
    });
    return NextResponse.json({ ok: true, ...result }, { status: 201 });
  } catch (e) {
    console.error("register error", e);
    return NextResponse.json(
      { error: "تعذر إنشاء الحساب حاليًا. تحقق من إعداد قاعدة البيانات ثم أعد المحاولة." },
      { status: 500 }
    );
  }
}
