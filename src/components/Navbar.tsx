"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

const links = [
  ["Menu", "#menu"],
  ["Our space", "#experience"],
  ["Reviews", "#testimonial"],
  ["Visit", "#contact"],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  return (
    <header className="absolute inset-x-0 top-0 z-30 text-white">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 xl:px-12">
        <a href="#home" className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-.03em]">
          Kopi Sore
        </a>
        <nav className="hidden gap-8 text-[10px] font-semibold uppercase tracking-[.2em] md:flex">
          {links.map(([label, href]) => <a key={href} href={href} className="border-b border-transparent py-2 hover:border-white">{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleCart} className="border border-white/55 px-3 min-h-9 py-2 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
            Bag · {totalItems}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center border border-white/55 text-sm md:hidden" aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"} aria-expanded={menuOpen}>
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
      </div>
      {menuOpen && <nav className="mx-5 border-t border-white/30 bg-[#201b18]/95 px-5 py-4 md:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-white/15 py-3 text-sm">{label}</a>)}</nav>}
    </header>
  );
}
