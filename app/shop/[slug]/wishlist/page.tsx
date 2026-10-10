"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
type Item = { id: string; name: string; price: number; imageUrl: string | null };
export default function Wishlist({ params }: { params: Promise<{ slug: string }> }) {
  const [items, setItems] = useState<Item[]>([]);
  const [slug, setSlug] = useState("");
  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);
  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(`ms-wishlist-${slug}`) || "[]"));
    } catch {}
  }, [slug]);
  function remove(id: string) {
    const n = items.filter((x) => x.id !== id);
    setItems(n);
    localStorage.setItem(`ms-wishlist-${slug}`, JSON.stringify(n));
  }
  return (
    <main className="container py-10">
      <Link href={`/shop/${slug}`} className="text-amber-700">
        ← العودة للمتجر
      </Link>
      <h1 className="mt-5 text-3xl font-black">قائمة الرغبات</h1>
      {items.length ? (
        <div className="grid-products mt-6">
          {items.map((x) => (
            <article className="card p-3" key={x.id}>
              {x.imageUrl && <img className="product-image" src={x.imageUrl} alt={x.name} />}
              <b className="mt-3 block">{x.name}</b>
              <button className="btn btn-soft mt-3" onClick={() => remove(x.id)}>
                <Trash2 size={16} /> إزالة
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="card mt-6 p-10 text-center">
          <Heart className="mx-auto text-amber-500" size={40} />
          <p className="mt-3 text-slate-500">قائمة الرغبات فارغة على هذا الجهاز.</p>
        </div>
      )}
    </main>
  );
}
