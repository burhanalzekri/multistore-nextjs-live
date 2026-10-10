import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { cache } from "react";
export const currentSession = cache(async () => auth());
export async function requireUser() {
  const session = await currentSession();
  if (!session?.user?.id) redirect("/login");
  return session.user;
}
export async function requireRole(roles: string[]) {
  const user = await requireUser();
  if (!roles.includes(user.role)) redirect(user.role === "SUPER_ADMIN" ? "/admin" : "/dashboard");
  return user;
}
export async function requireShop() {
  const user = await requireRole(["SHOP_OWNER", "SHOP_STAFF"]);
  const member = await db.shopMember.findFirst({
    where: { userId: user.id, ...(user.role === "SHOP_OWNER" ? { role: "SHOP_OWNER" } : {}) },
    include: { shop: true },
    orderBy: { createdAt: "asc" },
  });
  if (!member || member.shop.status !== "ACTIVE") redirect("/dashboard/shops");
  return { user, shop: member.shop, membership: member };
}
export async function getPublicShop(slug: string) {
  return db.shop.findFirst({ where: { slug, status: "ACTIVE" } });
}
