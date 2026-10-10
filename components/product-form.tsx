"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Save, RotateCcw } from "lucide-react";
import { useModal } from "@/components/modal-provider";
type P = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sku: string | null;
  barcode: string | null;
  price: string;
  compareAtPrice: string;
  stock: number;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  imageUrl: string | null;
};
export function ProductForm({ product }: { product?: P }) {
  const [busy, setBusy] = useState(false);
  const [image, setImage] = useState(product?.imageUrl || "");
  const [fileName, setFileName] = useState("");
  const router = useRouter();
  const { notify } = useModal();
  useEffect(() => {
    if (image) {
    }
  }, [image]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const data = Object.fromEntries(f);
    data.imageUrl = image;
    try {
      const r = await fetch(product ? `/api/products/${product.id}` : "/api/products", {
        method: product ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "تعذر حفظ المنتج");
      notify({ type: "success", title: "تم الحفظ", message: "تم حفظ بيانات المنتج." });
      router.push("/dashboard/products");
      router.refresh();
    } catch (err) {
      notify({
        type: "error",
        title: "فشل الحفظ",
        message: err instanceof Error ? err.message : "حدث خطأ غير متوقع",
      });
    } finally {
      setBusy(false);
    }
  }
  function loadFile(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify({ type: "error", title: "نوع ملف غير مدعوم", message: "اختر ملف صورة صالحًا." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      notify({ type: "error", title: "الصورة كبيرة", message: "الحد الأقصى للصورة 5 ميغابايت." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result));
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  }
  return (
    <form onSubmit={submit} className="card grid gap-6 p-5 md:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-bold">
          اسم المنتج *
          <input
            name="name"
            className="field mt-2"
            required
            minLength={2}
            defaultValue={product?.name}
          />
        </label>
        <label className="text-sm font-bold">
          الرابط (Slug) *
          <input
            name="slug"
            className="field mt-2"
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            defaultValue={product?.slug}
            placeholder="product-name"
          />
          <small className="mt-1 block text-slate-400">حروف إنجليزية صغيرة وأرقام وشرطة</small>
        </label>
        <label className="text-sm font-bold">
          السعر *
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            className="field mt-2"
            required
            defaultValue={product?.price}
          />
        </label>
        <label className="text-sm font-bold">
          السعر قبل الخصم
          <input
            name="compareAtPrice"
            type="number"
            step="0.01"
            min="0"
            className="field mt-2"
            defaultValue={product?.compareAtPrice}
          />
        </label>
        <label className="text-sm font-bold">
          المخزون *
          <input
            name="stock"
            type="number"
            step="1"
            min="0"
            className="field mt-2"
            required
            defaultValue={product?.stock ?? 0}
          />
        </label>
        <label className="text-sm font-bold">
          SKU
          <input name="sku" className="field mt-2" defaultValue={product?.sku || ""} />
        </label>
        <label className="text-sm font-bold">
          الباركود
          <input name="barcode" className="field mt-2" defaultValue={product?.barcode || ""} />
        </label>
        <label className="text-sm font-bold">
          الحالة
          <select name="status" className="field mt-2" defaultValue={product?.status || "DRAFT"}>
            <option value="DRAFT">مسودة</option>
            <option value="ACTIVE">نشط</option>
            <option value="ARCHIVED">مؤرشف</option>
          </select>
        </label>
      </div>
      <label className="text-sm font-bold">
        وصف المنتج
        <textarea
          name="description"
          className="field mt-2 min-h-28"
          defaultValue={product?.description || ""}
        />
      </label>
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="product-image border">
          {image ? (
            <img src={image} alt="معاينة صورة المنتج" />
          ) : (
            <ImagePlus size={42} className="text-amber-500" />
          )}
        </div>
        <div>
          <label className="block text-sm font-bold">صورة المنتج</label>
          <input
            className="field mt-2"
            type="url"
            value={image.startsWith("data:") ? "" : image}
            onChange={(e) => {
              setImage(e.target.value);
              setFileName("");
            }}
            placeholder="https://res.cloudinary.com/..."
          />
          <label className="btn btn-soft mt-3 cursor-pointer">
            <ImagePlus size={17} /> اختر صورة من الجهاز
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => loadFile(e.target.files?.[0])}
            />
          </label>
          {fileName && <p className="mt-2 text-xs text-green-700">{fileName} — معاينة محلية فقط</p>}
          <p className="mt-2 text-xs leading-6 text-slate-500">
            في هذه النسخة تُقبل الروابط المباشرة. رفع ملفات Cloudinary الحقيقي يحتاج إعداد بيانات
            الخدمة وإنشاء توقيع رفع آمن من الخادم. لا تضع سر Cloudinary في المتصفح.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-end gap-2 border-t pt-5">
        <button type="button" onClick={() => router.back()} className="btn btn-soft">
          <RotateCcw size={16} /> رجوع
        </button>
        <button disabled={busy} className="btn btn-primary">
          <Save size={17} />
          {busy ? "جارٍ الحفظ..." : "حفظ المنتج"}
        </button>
      </div>
    </form>
  );
}
