"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Plus } from "lucide-react";
import { useModal } from "@/components/modal-provider";

type P = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
};

export function CartButton({ shopId, product }: { shopId: string; product?: P }) {
  const [count, setCount] = useState(0);
  const { notify } = useModal();

  useEffect(() => {
    try {
      const key = `ms-cart-${shopId}`;
      const raw = localStorage.getItem(key) || "[]";
      const cart = JSON.parse(raw);
      setCount(cart.reduce((n: number, x: any) => n + x.quantity, 0));
    } catch {
      // ignore
    }
  }, [shopId]);

  function add() {
    if (!product) return;
    try {
      const key = `ms-cart-${shopId}`;
      const raw = localStorage.getItem(key) || "[]";
      const cart: any[] = JSON.parse(raw);
      const found = cart.find((x) => x.id === product.id);
      if (found) {
        found.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem(key, JSON.stringify(cart));
      setCount(cart.reduce((n, x) => n + x.quantity, 0));
      notify({
        type: "success",
        title: "أضيف إلى السلة",
        message: `تمت إضافة ${product.name} إلى سلة التسوق.`,
      });
    } catch {
      notify({
        type: "error",
        title: "تعذر الإضافة",
        message: "تعذر تحديث سلة التسوق.",
      });
    }
  }

  function showCart() {
    notify({
      type: "info",
      title: "سلة التسوق",
      message: `عدد القطع في السلة: ${count}. السلة محفوظة على هذا الجهاز.`,
    });
  }

  if (product) {
    return (
      <button onClick={add} className="btn btn-primary mt-3 w-full" type="button">
        <Plus size={17} />
        أضف للسلة
      </button>
    );
  }

  return (
    <button onClick={showCart} className="btn btn-soft" type="button">
      <ShoppingBag size={18} />
      السلة
      <span className="rounded-full bg-amber-500 px-2 py-0.5 text-white">{count}</span>
    </button>
  );
}
