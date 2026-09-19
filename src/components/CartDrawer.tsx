"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { business } from "@/lib/data";
import { IconCup } from "./icons";
import { useCart } from "./CartProvider";

const rupiah = (value: number) => `Rp${value.toLocaleString("id-ID")}`;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function CartDrawer() {
  const { items, isOpen, closeCart, inc, dec, removeItem, totalItems, totalPrice, clear } = useCart();
  const panelRef = useRef<HTMLElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Escape untuk menutup + focus trap saat terbuka.
  useEffect(() => {
    if (!isOpen) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCart();
        return;
      }
      if (event.key !== "Tab") return;

      // Loop Tab tetap di dalam drawer.
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
    };
  }, [isOpen, closeCart]);

  // Scroll lock: halaman di belakang tidak ikut bergulir saat drawer terbuka.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

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

  return (
    <>
      <button
        aria-label="Tutup keranjang"
        tabIndex={-1}
        onClick={closeCart}
        className={`fixed inset-0 z-[70] bg-black/45 transition-opacity ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
        inert={!isOpen}
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-paper transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex h-20 items-center justify-between border-b border-rule px-5 sm:px-7">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.22em] text-accent">Your order · {totalItems} items</p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">The bag</h2>
          </div>
          <button data-autofocus onClick={closeCart} className="grid h-10 w-10 place-items-center border border-rule" aria-label="Tutup keranjang">×</button>
        </header>
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {items.length === 0 ? <div className="grid h-full place-content-center text-center"><IconCup className="mx-auto h-9 w-9 text-accent" /><h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold">Nothing here yet.</h3><p className="mt-1 text-xs text-muted">Choose a drink from our menu.</p><button onClick={closeCart} className="mt-5 border-b border-ink pb-1 text-[9px] font-bold uppercase tracking-widest">Return to menu</button></div> : <ul>{items.map(item => <li key={item.id} className="grid grid-cols-[72px_1fr] gap-4 border-b border-rule py-4"><div className="relative h-[88px] overflow-hidden"><Image src={item.image} alt={item.name} fill className="object-cover" sizes="72px"/></div><div><div className="flex justify-between gap-2"><div><h3 className="font-[family-name:var(--font-display)] font-bold">{item.name}</h3><p className="mt-1 text-[9px] uppercase tracking-wider text-muted">{item.temperature || "Iced"} · {item.sweetness || "Normal"}</p></div><button onClick={() => removeItem(item.id)} className="self-start text-xs text-muted" aria-label={`Hapus ${item.name} dari keranjang`}>×</button></div><div className="mt-5 flex items-center justify-between"><div className="flex border border-rule"><button onClick={() => dec(item.id)} className="h-7 w-7" aria-label={`Kurangi jumlah ${item.name}`}>−</button><span className="grid h-7 w-7 place-items-center border-x border-rule text-xs" aria-label={`Jumlah ${item.name}: ${item.qty}`}>{item.qty}</span><button onClick={() => inc(item.id)} className="h-7 w-7" aria-label={`Tambah jumlah ${item.name}`}>+</button></div><strong className="text-sm">{rupiah(item.price * item.qty)}</strong></div></div></li>)}</ul>}
        </div>
        {items.length > 0 && <footer className="border-t border-rule bg-canvas p-5 sm:p-7"><div className="flex justify-between text-[9px] uppercase tracking-widest text-muted"><span>{totalItems} items</span><button onClick={clear}>Clear all</button></div><div className="mt-2 flex items-end justify-between"><span className="font-[family-name:var(--font-display)] text-xl font-bold">Total</span><strong className="font-[family-name:var(--font-display)] text-3xl">{rupiah(totalPrice)}</strong></div><a href={`https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="mt-5 block bg-ink py-4 text-center text-[9px] font-bold uppercase tracking-[.2em] text-white hover:bg-accent">Checkout via WhatsApp ↗</a></footer>}
      </aside>
    </>
  );
}
