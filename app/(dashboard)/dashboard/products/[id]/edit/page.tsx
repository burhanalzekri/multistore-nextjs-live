import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireShop } from "@/lib/tenant";
import { ProductForm } from "@/components/product-form";
export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { shop } = await requireShop();
  const { id } = await params;
  const p = await db.product.findFirst({ where: { id, shopId: shop.id } });
  if (!p) notFound();
  return (
    <>
      <h1 className="mb-2 text-3xl font-black">تعديل المنتج</h1>
      <p className="mb-6 text-slate-500">تعديل بيانات {p.name}</p>
      <ProductForm
        product={{
          ...p,
          price: p.price.toString(),
          compareAtPrice: p.compareAtPrice?.toString() || "",
        }}
      />
    </>
  );
}
