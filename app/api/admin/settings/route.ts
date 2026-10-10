import { NextResponse } from "next/server";
import { requireRole } from "@/lib/tenant";
import { db } from "@/lib/db";
import { z } from "zod";
export async function PATCH(req: Request) {
  try {
    await requireRole(["SUPER_ADMIN"]);
    const parsed = z
      .object({ key: z.string().min(2).max(100), value: z.unknown() })
      .safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 422 });
    await db.siteSetting.upsert({
      where: { scopeId_key: { scopeId: "platform", key: parsed.data.key } },
      update: { value: parsed.data.value as any },
      create: {
        scopeId: "platform",
        shopId: null,
        key: parsed.data.key,
        value: parsed.data.value as any,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "غير مصرح أو تعذر الحفظ" }, { status: 403 });
  }
}
