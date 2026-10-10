import { db } from "@/lib/db";
export default async function Page() {
  const rows = await db.subscription.findMany({
    include: { shop: true, plan: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return (
    <>
      <h1 className="text-3xl font-black">الاشتراكات والفواتير</h1>
      <p className="mt-2 text-slate-500">{rows.length} سجل (حتى 100)</p>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4">المعرّف</th>
              <th className="p-4">الاسم / النوع</th>
              <th className="p-4">الحالة / التفاصيل</th>
              <th className="p-4">تاريخ الإنشاء</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any) => (
              <tr className="border-t" key={r.id}>
                <td className="max-w-36 truncate p-4 font-mono text-xs">{r.id}</td>
                <td className="p-4">
                  {r.name ||
                    r.email ||
                    r.action ||
                    r.key ||
                    r.shop?.name ||
                    r.plan?.name ||
                    r.number ||
                    "—"}
                </td>
                <td className="p-4">
                  {r.status || r.role || r.action || JSON.stringify(r.value || r.metadata || "")}
                </td>
                <td className="p-4">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString("ar") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-10 text-center text-slate-500">لا توجد سجلات بعد.</p>}
      </div>
    </>
  );
}
