import { NextResponse } from "next/server";
import { requireRole } from "@/lib/tenant";
import { db } from "@/lib/db";
import { z } from "zod";
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireRole(["SUPER_ADMIN"]);
    const { id } = await params;
    const parsed = z
      .object({ status: z.enum(["PENDING", "ACTIVE", "SUSPENDED"]) })
      .safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "حالة غير صحيحة" }, { status: 422 });
    const shop = await db.shop.update({ where: { id }, data: { status: parsed.data.status } });
    await db.activityLog.create({
      data: {
        userId: user.id,
        shopId: shop.id,
        action: "admin.shop.status.updated",
        entityType: "Shop",
        entityId: id,
        metadata: { status: parsed.data.status },
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "غير مصرح أو تعذر التحديث" }, { status: 403 });
  }
}
