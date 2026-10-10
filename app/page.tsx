import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BarChart3,
  Boxes,
  Check,
  Globe2,
  MessageSquareText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Zap,
  Users,
  ChartNoAxesCombined,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
const features = [
  { i: ShoppingBag, t: "متجر احترافي", d: "واجهة أنيقة وسريعة ومتوافقة مع الجوال، بهوية متجرك." },
  { i: Boxes, t: "إدارة المنتجات", d: "صور ومتغيرات ومخزون وباركود وتصنيفات من لوحة واحدة." },
  { i: BarChart3, t: "لوحة ذكية", d: "تابع المبيعات والطلبات والعملاء ومؤشرات النمو." },
  { i: MessageSquareText, t: "تواصل العملاء", d: "جهّز قنوات الإشعارات وسجل الرسائل والحملات." },
  { i: ShieldCheck, t: "عزل وأمان", d: "فصل بيانات المتاجر وصلاحيات حسب دور المستخدم." },
  { i: Globe2, t: "عالمي ومتعدد اللغات", d: "عملات ومناطق زمنية واتجاه RTL/LTR وإعدادات محلية." },
];
export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="section overflow-hidden">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="eyebrow">
              <Sparkles size={15} className="ml-1" /> منصة التجارة الإلكترونية المتكاملة
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.3] tracking-tight sm:text-5xl lg:text-6xl">
              حوّل فكرتك إلى{" "}
              <span className="bg-gradient-to-l from-amber-500 to-orange-600 bg-clip-text text-transparent">
                متجر يبيع
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              أنشئ متجرك الإلكتروني وأدر المنتجات والطلبات والعملاء من لوحة تحكم واحدة. تجربة أنيقة،
              أدوات عملية، ونمو يبدأ بخطوات بسيطة.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="btn btn-primary px-6 py-4">
                أنشئ متجرك مجانًا <ArrowLeft size={18} />
              </Link>
              <Link href="/shop/demo" className="btn btn-soft px-6 py-4">
                استكشف متجرًا تجريبيًا
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
              {["إعداد بسيط", "متوافق مع الجوال", "لوحة عربية"].map((x) => (
                <span key={x} className="flex items-center gap-1">
                  <Check size={16} className="text-green-600" />
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-amber-200/40 blur-3xl" />
            <div className="relative rounded-[30px] border border-white bg-white p-3 shadow-2xl shadow-amber-900/10">
              <div className="rounded-[23px] bg-slate-50 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">نظرة عامة</span>
                    <h3 className="mt-1 text-xl font-black">لوحة متجرك</h3>
                  </div>
                  <span className="rounded-xl bg-green-100 px-3 py-2 text-xs font-bold text-green-700">
                    نشط ●
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="stat-card">
                    <span className="text-xs text-slate-500">إجمالي المبيعات</span>
                    <b className="mt-2 block text-2xl">$8,420</b>
                    <span className="text-xs text-green-600">↑ 12.8%</span>
                  </div>
                  <div className="stat-card">
                    <span className="text-xs text-slate-500">الطلبات</span>
                    <b className="mt-2 block text-2xl">248</b>
                    <span className="text-xs text-green-600">↑ 8.4%</span>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border bg-white p-4">
                  <div className="flex justify-between text-sm">
                    <b>أداء المبيعات</b>
                    <span className="text-slate-400">آخر 7 أيام</span>
                  </div>
                  <div className="mt-5 flex h-28 items-end gap-2">
                    {[35, 54, 42, 76, 59, 91, 70, 100, 65, 83, 58, 89].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-amber-500 to-orange-300"
                        style={{ height: `${h}%`, opacity: 0.5 + h / 200 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-white p-3">
                    <ShoppingBag className="mx-auto mb-1 text-amber-600" />
                    <b>المنتجات</b>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <Users className="mx-auto mb-1 text-amber-600" />
                    <b>العملاء</b>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <ChartNoAxesCombined className="mx-auto mb-1 text-amber-600" />
                    <b>التقارير</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-100 text-green-700">
                  <Zap />
                </span>
                <div>
                  <b className="block text-sm">كل شيء في مكان واحد</b>
                  <span className="text-xs text-slate-500">من المنتج حتى التسليم</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y bg-white py-6">
        <div className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-bold text-slate-500">
          <span>مصمم للتجارة الحديثة</span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="text-amber-600" /> عزل بيانات المتاجر
          </span>
          <span className="flex items-center gap-2">
            <Truck className="text-amber-600" /> إدارة الطلبات
          </span>
          <span className="flex items-center gap-2">
            <Globe2 className="text-amber-600" /> عملات ولغات متعددة
          </span>
        </div>
      </section>
      <section id="features" className="section">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">كل ما تحتاجه للنمو</span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">أدوات قوية، بتجربة سهلة</h2>
            <p className="mt-3 leading-7 text-slate-500">
              بدل التنقل بين أنظمة كثيرة، أدر أعمالك اليومية من منصة واحدة متكاملة.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ i: Icon, t, d }, n) => (
              <article className="card p-6 transition hover:-translate-y-1 hover:shadow-xl" key={t}>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-700">
                  <Icon size={23} />
                </div>
                <h3 className="mt-5 text-lg font-extrabold">{t}</h3>
                <p className="mt-2 leading-7 text-slate-500">{d}</p>
                <span className="mt-4 block text-xs font-bold text-amber-700">
                  الميزة {String(n + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="how" className="section bg-white">
        <div className="container">
          <div className="text-center">
            <span className="eyebrow">ثلاث خطوات بسيطة</span>
            <h2 className="mt-4 text-3xl font-black">من الفكرة إلى أول طلب</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { n: "01", t: "أنشئ حسابك", d: "سجل بياناتك واختر اسمًا ورابطًا مميزًا لمتجرك." },
              { n: "02", t: "أضف منتجاتك", d: "أضف الصور والأسعار والمخزون وخصص إعدادات المتجر." },
              {
                n: "03",
                t: "ابدأ البيع",
                d: "شارك رابط متجرك وتابع الطلبات والعملاء من لوحة التحكم.",
              },
            ].map((s) => (
              <div className="card p-7" key={s.n}>
                <span className="text-4xl font-black text-amber-500/50">{s.n}</span>
                <h3 className="mt-4 text-xl font-extrabold">{s.t}</h3>
                <p className="mt-2 leading-7 text-slate-500">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">تحكم أوضح</span>
            <h2 className="mt-4 text-3xl font-black leading-relaxed">
              قرارات أفضل تبدأ من أرقام واضحة
            </h2>
            <p className="mt-3 leading-8 text-slate-500">
              راقب الطلبات والمبيعات والمخزون، وتعرّف على المنتجات الأكثر حركة والعملاء العائدين.
              تتوسع المنصة مع احتياجات متجرك.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "تقارير مبيعات وفترات زمنية",
                "تنبيهات المخزون المنخفض",
                "سجل نشاط لتتبع العمليات",
              ].map((t) => (
                <p key={t} className="flex items-center gap-2">
                  <Check size={18} className="text-green-600" />
                  {t}
                </p>
              ))}
            </div>
          </div>
          <div className="card overflow-hidden p-5">
            <Image
              src="/images/marketing/dashboard.svg"
              alt="رسم توضيحي للوحة تحكم MultiStore"
              width={720}
              height={480}
              className="h-auto w-full"
            />
            <p className="mt-3 text-center text-sm text-slate-500">
              تصميم مرن يضع أهم بياناتك أمامك
            </p>
          </div>
        </div>
      </section>
      <section id="pricing" className="section bg-white">
        <div className="container text-center">
          <span className="eyebrow">ابدأ على مهل</span>
          <h2 className="mt-4 text-3xl font-black">خطتك تبدأ حسب احتياجك</h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-500">
            يمكنك إعداد تجربة المتجر أولًا. تفاصيل الخطط والفوترة تُدار من إعدادات المنصة بعد تهيئة
            مزود الدفع.
          </p>
          <div className="mx-auto mt-8 max-w-md rounded-3xl border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-white p-8 text-right">
            <span className="eyebrow">الخطة الأساسية</span>
            <h3 className="mt-4 text-2xl font-black">ابدأ بمتجرك</h3>
            <p className="mt-2 text-sm text-slate-500">إعداد أولي لإطلاق متجرك واختبار المنتجات.</p>
            <ul className="my-6 space-y-3 text-sm">
              {[
                "واجهة متجر متجاوبة",
                "إدارة المنتجات والطلبات",
                "إعدادات اللغة والعملة",
                "لوحة تحكم موحدة",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check className="text-green-600" size={17} />
                  {x}
                </li>
              ))}
            </ul>
            <Link href="/register" className="btn btn-primary w-full">
              أنشئ حسابك الآن <ArrowLeft size={17} />
            </Link>
            <p className="mt-3 text-center text-xs text-slate-400">
              لا تدخل بيانات دفع في هذه النسخة التأسيسية.
            </p>
          </div>
        </div>
      </section>
      <section id="faq" className="section">
        <div className="container max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">الأسئلة الشائعة</span>
            <h2 className="mt-4 text-3xl font-black">هل لديك سؤال؟</h2>
          </div>
          <div className="mt-8 space-y-3">
            {[
              {
                q: "هل أحتاج خبرة تقنية؟",
                a: "الواجهة مصممة لتسهيل إعداد المتجر وإدارة المنتجات من لوحة واحدة.",
              },
              {
                q: "هل يدعم العربية؟",
                a: "نعم، الواجهة الافتراضية عربية باتجاه RTL، مع تجهيز إعدادات اللغات الأخرى.",
              },
              {
                q: "هل يمكن تخصيص العملة؟",
                a: "تتضمن إعدادات المتجر العملة والرمز وعدد المنازل العشرية.",
              },
              {
                q: "هل بيانات كل متجر منفصلة؟",
                a: "تم تصميم النماذج والمساعدات لتربط بيانات المتجر بمعرّف shopId، ويجب اختبار جميع مسارات الإنتاج قبل الإطلاق العام.",
              },
              {
                q: "هل الدفع الإلكتروني جاهز؟",
                a: "تحتاج بوابات الدفع الحقيقية إلى حسابات مزودين ومفاتيح سرية وتهيئة Webhooks قبل تفعيلها.",
              },
            ].map((item) => (
              <details key={item.q} className="card p-5">
                <summary className="cursor-pointer font-extrabold">{item.q}</summary>
                <p className="mt-3 leading-7 text-slate-500">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="container rounded-[28px] bg-gradient-to-l from-amber-500 to-orange-600 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-black">جاهز لبناء متجرك؟</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            ابدأ بإعداد الحساب، ثم أكمل معلومات المتجر ومنتجاتك.
          </p>
          <Link href="/register" className="btn mt-6 bg-white px-6 py-3 text-amber-800">
            ابدأ الآن <ArrowLeft size={17} />
          </Link>
        </div>
      </section>
      <footer className="border-t bg-white py-8">
        <div className="container flex flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <b className="text-slate-900">MultiStore</b>
          <span>منصة متاجر إلكترونية متعددة البائعين</span>
          <span>© {new Date().getFullYear()} MultiStore</span>
        </div>
      </footer>
    </main>
  );
}
