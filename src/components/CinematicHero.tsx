"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";
import { useCart } from "./CartProvider";

const links = [
  ["Menu", "#menu"],
  ["Our space", "#experience"],
  ["Story", "#about"],
  ["Visit", "#contact"],
];

export default function CinematicHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 45, damping: 22 });
  const y = useSpring(py, { stiffness: 45, damping: 22 });
  const imageX = useTransform(x, [-0.5, 0.5], ["-1.2%", "1.2%"]);
  const imageY = useTransform(y, [-0.5, 0.5], ["-1.2%", "1.2%"]);
  const { toggleCart, totalItems } = useCart();

  return (
    <section
      id="home"
      className="relative bg-canvas"
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        px.set(event.clientX / window.innerWidth - 0.5);
        py.set(event.clientY / window.innerHeight - 0.5);
      }}
    >
      <header className="absolute inset-x-0 top-0 z-30 text-white">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 xl:px-12">
          <a href="#home" className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-.03em]">
            Kopi Sore
          </a>
          <nav className="hidden gap-8 text-[10px] font-semibold uppercase tracking-[.2em] md:flex">
            {links.map(([label, href]) => <a key={href} href={href} className="border-b border-transparent py-2 hover:border-white">{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggleCart} className="border border-white/55 px-3 py-2 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
              Bag · {totalItems}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-9 w-9 place-items-center border border-white/55 text-sm md:hidden" aria-label="Buka navigasi">
              {menuOpen ? "×" : "≡"}
            </button>
          </div>
        </div>
        {menuOpen && <nav className="mx-5 border-t border-white/30 bg-[#201b18]/95 px-5 py-4 md:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-white/15 py-3 text-sm">{label}</a>)}</nav>}
      </header>

      {/* One image, composed differently at each breakpoint. */}
      <div className="relative h-[68svh] min-h-[480px] overflow-hidden sm:h-[76svh] lg:h-[100svh] lg:min-h-[620px]">
        <motion.div className="absolute -inset-4" style={{ x: imageX, y: imageY }}>
          {/* Cropped into the espresso bar: the source photo carries a readable
              "BIBBLE & SIP" menu board in its top-left, and object-position
              alone can't remove it (cover slack is only ~10px at these ratios). */}
          <Image
            src="https://images.pexels.com/photos/38617194/pexels-photo-38617194.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=2000"
            alt="Interior natural coffee shop Kopi Sore"
            fill
            priority
            className="scale-[2] origin-[45%_74%] object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:h-1/2" />

        <div className="absolute inset-x-0 bottom-0 mx-auto hidden max-w-[1600px] items-end justify-between px-8 pb-8 text-white sm:flex xl:px-12 xl:pb-12">
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }} className="font-[family-name:var(--font-display)] text-[clamp(5.5rem,14vw,13rem)] font-black leading-[.72] tracking-[-.075em]">
            SORE<span className="text-[#c6b9ab]">.</span>
          </motion.h1>
          <div className="mb-1 max-w-[250px] border-l border-white/55 pl-5 xl:mb-3 xl:max-w-[300px]">
            <p className="font-[family-name:var(--font-display)] text-xl leading-tight xl:text-2xl">A quiet place for coffee and conversation.</p>
            <a href="#menu" className="mt-5 inline-block border-b border-white pb-1 text-[10px] font-bold uppercase tracking-[.18em]">Explore the menu</a>
          </div>
        </div>
      </div>

      {/* Mobile editorial information: deliberately outside the photo. */}
      <div className="px-5 py-8 sm:hidden">
        <p className="text-[9px] font-bold uppercase tracking-[.22em] text-accent">Bekasi · Everyday · 08—22</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-[4.25rem] font-black leading-[.77] tracking-[-.07em]">KOPI<br/>SORE.</h1>
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-rule pt-4">
          <p className="max-w-[220px] text-xs leading-5 text-muted">Kopi yang jujur, ruang yang tenang, dan sore yang berjalan sedikit lebih lambat.</p>
          <a href="#menu" className="grid h-12 w-12 shrink-0 place-items-center bg-ink text-lg text-white">↓</a>
        </div>
      </div>
    </section>
  );
}
