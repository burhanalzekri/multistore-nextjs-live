"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal-provider";
export function ProductDeleteButton({ id, name }: { id: string; name: string }) {
  const { confirm, notify } = useModal();
  const router = useRouter();
  async function del() {
    if (
      !(await confirm({
        title: "حذف المنتج",
        message: `هل تريد حذف «${name}»؟ لا يمكن التراجع عن هذا الإجراء.`,
      }))
    )
      return;
    const r = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (r.ok) {
      notify({ type: "success", title: "تم الحذف", message: "حُذف المنتج بنجاح." });
      router.refresh();
    } else
      notify({ type: "error", title: "تعذر الحذف", message: "تحقق من الصلاحيات وحاول مرة أخرى." });
  }
  return (
    <button
      onClick={del}
      className="btn rounded-xl bg-red-50 px-3 text-red-600"
      aria-label="حذف المنتج"
    >
      <Trash2 size={17} />
    </button>
  );
}
