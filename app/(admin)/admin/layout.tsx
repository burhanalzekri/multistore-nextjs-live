import Link from "next/link";
import { requireRole } from "@/lib/tenant";
import {
  ShieldCheck,
  LayoutDashboard,
  Store,
  Users,
  Wallet,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth";
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["SUPER_ADMIN"]);
  return (
    <div className="min-h-screen md:flex">
      <aside className="w-full border-b bg-slate-950 p-4 text-white md:w-64 md:border-b-0 md:border-l">
        <Link href="/admin" className="flex items-center gap-2 p-3 text-xl font-black">
          <ShieldCheck className="text-amber-400" /> MultiStore Admin
        </Link>
        <nav className="mt-5 flex flex-wrap gap-1 md:block md:space-y-1">
          {[
            ["/admin", "نظرة عامة", LayoutDashboard],
            ["/admin/shops", "المتاجر", Store],
            ["/admin/users", "المستخدمون", Users],
            ["/admin/subscriptions", "الاشتراكات", Wallet],
            ["/admin/activity", "سجل النشاط", Activity],
            ["/admin/settings", "إعدادات المنصة", Settings],
          ].map(([href, label, Icon]: any) => (
            <Link
              href={href}
              key={href}
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-slate-200 hover:bg-slate-800"
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="mt-5 flex items-center gap-2 px-3 py-3 text-sm text-slate-300">
            <LogOut size={17} /> خروج
          </button>
        </form>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
