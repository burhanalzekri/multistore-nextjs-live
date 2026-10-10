import { ProductForm } from "@/components/product-form";
export default function NewProduct() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-black">إضافة منتج</h1>
      <p className="mb-6 text-slate-500">
        أدخل معلومات المنتج. يمكنك إضافة رابط صورة مباشر أو Cloudinary.
      </p>
      <ProductForm />
    </>
  );
}
