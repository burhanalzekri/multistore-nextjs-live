import Link from "next/link";
import { requireShop } from "@/lib/tenant";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Settings,
  ChartNoAxesCombined,
  Store,
  TicketPercent,
  MessageSquare,
  PanelsTopLeft,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth";
const links = [
  ["/dashboard", "نظرة عامة", LayoutDashboard],
  ["/dashboard/products", "المنتجات", Package],
  ["/dashboard/orders", "الطلبات", ShoppingCart],
  ["/dashboard/categories", "التصنيفات", PanelsTopLeft],
  ["/dashboard/customers", "العملاء", Users],
  ["/dashboard/coupons", "الكوبونات", TicketPercent],
  ["/dashboard/marketing", "التسويق والولاء", Tags],
  ["/dashboard/messages", "الرسائل", MessageSquare],
  ["/dashboard/reports", "التقارير", ChartNoAxesCombined],
  ["/dashboard/settings", "إعدادات المتجر", Settings],
] as const;
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, shop } = await requireShop();
  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden w-[260px] shrink-0 border-l bg-white p-4 md:block">
        <Link href="/" className="flex items-center gap-2 px-3 py-4 text-xl font-black">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500 text-white">
            <Store />
          </span>
          MultiStore
        </Link>
        <div className="my-3 rounded-2xl bg-amber-50 p-4">
          <span className="text-xs text-amber-800">متجرك الحالي</span>
          <b className="mt-1 block">{shop.name}</b>
          <span className="mt-1 block truncate text-xs text-slate-500">/{shop.slug}</span>
        </div>
        <nav className="space-y-1">
          {links.map(([href, label, Icon]) => (
            <Link className="sidebar-link" href={href} key={href}>
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
          className="mt-5"
        >
          <button className="sidebar-link w-full">
            <LogOut size={18} /> تسجيل الخروج
          </button>
        </form>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="glass sticky top-0 z-30 flex h-[70px] items-center justify-between px-4 md:px-8">
          <div>
            <p className="text-xs text-slate-500">مساحة العمل</p>
            <b>{shop.name}</b>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/shop/${shop.slug}`} className="btn btn-soft">
              <Store size={17} /> عرض المتجر
            </Link>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-100 font-black text-amber-800">
              {user.name?.slice(0, 1) || "م"}
            </span>
          </div>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b bg-white p-2 md:hidden">
          {links.slice(0, 7).map(([href, label, Icon]) => (
            <Link className="sidebar-link whitespace-nowrap" href={href} key={href}>
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
