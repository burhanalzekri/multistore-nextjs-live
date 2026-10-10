# خريطة تنفيذ المراحل الـ12

| المرحلة | الملفات/الأساس في هذه الحزمة | ملاحظة تحقق |
|---|---|---|
| 1. تأسيس Next.js + Bun + Tailwind + Auth.js + Prisma | package.json, app/, lib/, configs | يحتاج `bun install` ثم typecheck/build |
| 2. مخطط البيانات والبذور | prisma/schema.prisma, prisma/seed.ts | شغّل migration على PostgreSQL حقيقية |
| 3. Multi-tenancy | lib/tenant.ts + shopId في النماذج وAPI | راجع كل route جديد باختبار cross-tenant |
| 4. المصادقة والأدوار | lib/auth.ts, middleware.ts, register/login, admin layout | استعادة كلمة المرور و2FA ليستا مفعّلتين |
| 5. إعدادات المتجر | dashboard/settings + api/settings | تشمل الهوية والاتصال والإقليم والضرائب وSEO؛ بقية الحقول يمكن توسيعها |
| 6. المنتجات والوسائط | CRUD products + preview + image URL | رفع Cloudinary الموقّع ومحرر الصور النهائي يحتاج ربطًا واختبارًا |
| 7. الطلبات والإشعارات | order schema + POST /api/orders + dashboard section | صفحة تتبع وإرسال خارجي غير مكتملين |
| 8. Super Admin | dashboard admin للمتاجر والمستخدمين والخطط والنشاط | صفحات قراءة أولية؛ عمليات التفعيل/الانتحال تحتاج سياسات إضافية |
| 9. Landing ديناميكية | app/page.tsx | المحتوى ثابت حاليًا؛ محرر أقسام CMS غير موصول |
| 10. Storefront + PWA | shop/[slug], product page, local cart, manifest, sw | checkout متكامل وpush subscription يحتاجان استكمالًا |
| 11. الأداء | Server Components افتراضيًا، صور Next، import optimization | قياس Lighthouse وCore Web Vitals مطلوب على نشر حقيقي |
| 12. النشر والمراقبة | README, health endpoint, Vercel/Neon guide | أتمتة النسخ الاحتياطي وSentry/alerts تحتاج مفاتيح وربطًا |

لا تعتبر المرحلة مجتازة إنتاجيًا قبل تنفيذ التحقق الموضح لها.
