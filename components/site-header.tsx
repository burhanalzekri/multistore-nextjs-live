import Link from "next/link";
import { Store, ArrowLeft, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
export function SiteHeader() {
  return (
    <header className="glass sticky top-0 z-40 border-x-0 border-t-0">
      <div className="container flex h-[74px] items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white">
            <Store />
          </span>
          <span className="text-xl font-black">
            Multi<span className="text-amber-600">Store</span>
            <small className="block text-[10px] font-medium tracking-wide text-slate-500">
              متجرك يبدأ من هنا
            </small>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <a href="#features">المميزات</a>
          <a href="#how">كيف يعمل</a>
          <a href="#pricing">الأسعار</a>
          <a href="#faq">الأسئلة الشائعة</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden px-3 py-2 text-sm font-bold sm:inline">
            دخول
          </Link>
          <Link href="/register" className="btn btn-primary">
            ابدأ مجانًا <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
