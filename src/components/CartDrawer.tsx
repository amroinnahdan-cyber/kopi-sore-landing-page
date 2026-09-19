"use client";

import Image from "next/image";
import { business } from "@/lib/data";
import { IconCup } from "./icons";
import { useCart } from "./CartProvider";

const rupiah = (value: number) => `Rp${value.toLocaleString("id-ID")}`;

export default function CartDrawer() {
  const { items, isOpen, closeCart, inc, dec, removeItem, totalItems, totalPrice, clear } = useCart();
  // Teks pesan dirakit sebagai teks biasa, lalu di-encode sekali di akhir —
  // aman untuk karakter apa pun (koma, spasi, emoji, dsb).
  const message = [
    "Halo Kopi Sore, saya ingin pesan:",
    "",
    ...items.map(
      (item, index) =>
        `${index + 1}. ${item.name} x${item.qty}\n   ${item.temperature || "Iced"} · ${item.sweetness || "Normal"}\n   ${rupiah(item.price * item.qty)}`
    ),
    "",
    `Total: ${rupiah(totalPrice)}`,
  ].join("\n");

  return <>
    <button aria-label="Tutup keranjang" onClick={closeCart} className={`fixed inset-0 z-[70] bg-black/45 transition-opacity ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} />
    <aside className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-paper transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <header className="flex h-20 items-center justify-between border-b border-rule px-5 sm:px-7"><div><p className="text-[8px] font-bold uppercase tracking-[.22em] text-accent">Your order · {totalItems} items</p><h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">The bag</h2></div><button onClick={closeCart} className="grid h-10 w-10 place-items-center border border-rule">×</button></header>
      <div className="flex-1 overflow-y-auto p-5 sm:p-7">
        {items.length === 0 ? <div className="grid h-full place-content-center text-center"><IconCup className="mx-auto h-9 w-9 text-accent" /><h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold">Nothing here yet.</h3><p className="mt-1 text-xs text-muted">Choose a drink from our menu.</p><button onClick={closeCart} className="mt-5 border-b border-ink pb-1 text-[9px] font-bold uppercase tracking-widest">Return to menu</button></div> : <ul>{items.map(item => <li key={item.id} className="grid grid-cols-[72px_1fr] gap-4 border-b border-rule py-4"><div className="relative h-[88px] overflow-hidden"><Image src={item.image} alt={item.name} fill className="object-cover" sizes="72px"/></div><div><div className="flex justify-between gap-2"><div><h3 className="font-[family-name:var(--font-display)] font-bold">{item.name}</h3><p className="mt-1 text-[9px] uppercase tracking-wider text-muted">{item.temperature || "Iced"} · {item.sweetness || "Normal"}</p></div><button onClick={() => removeItem(item.id)} className="self-start text-xs text-muted">×</button></div><div className="mt-5 flex items-center justify-between"><div className="flex border border-rule"><button onClick={() => dec(item.id)} className="h-7 w-7">−</button><span className="grid h-7 w-7 place-items-center border-x border-rule text-xs">{item.qty}</span><button onClick={() => inc(item.id)} className="h-7 w-7">+</button></div><strong className="text-sm">{rupiah(item.price * item.qty)}</strong></div></div></li>)}</ul>}
      </div>
      {items.length > 0 && <footer className="border-t border-rule bg-canvas p-5 sm:p-7"><div className="flex justify-between text-[9px] uppercase tracking-widest text-muted"><span>{totalItems} items</span><button onClick={clear}>Clear all</button></div><div className="mt-2 flex items-end justify-between"><span className="font-[family-name:var(--font-display)] text-xl font-bold">Total</span><strong className="font-[family-name:var(--font-display)] text-3xl">{rupiah(totalPrice)}</strong></div>    <a href={`https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="mt-5 block bg-ink py-4 text-center text-[9px] font-bold uppercase tracking-[.2em] text-white hover:bg-accent">Checkout via WhatsApp ↗</a></footer>}
    </aside>
  </>;
}
