"use client";

import Image from "next/image";
import { useState } from "react";
import { business } from "@/lib/data";
import { useCart } from "./CartProvider";

const heroShowcaseDrinks = [
  {
    id: "kopi-susu-sore",
    name: "Kopi Susu Sore",
    subtitle: "Aren Palm Sugar & Double Shot",
    price: 18000,
    rating: "4.9",
    reviews: "1.4k+",
    image: "https://images.pexels.com/photos/18281882/pexels-photo-18281882.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    tag: "Most Loved ☕",
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    subtitle: "Silky Vanilla Cream & Caramel Drizzle",
    price: 24000,
    rating: "5.0",
    reviews: "890+",
    image: "https://images.pexels.com/photos/16008331/pexels-photo-16008331.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    tag: "Sweet Delight 🍯",
  },
  {
    id: "iced-americano",
    name: "Iced Americano",
    subtitle: "100% Arabica Clean Dark Roast",
    price: 20000,
    rating: "4.8",
    reviews: "620+",
    image: "https://images.pexels.com/photos/33542180/pexels-photo-33542180.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    tag: "Pure Roast ⚡",
  },
];

export default function Hero() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { addItem } = useCart();
  const current = heroShowcaseDrinks[selectedIdx];

  const handleAddToCart = () => {
    addItem({
      id: current.id,
      name: current.name,
      price: current.price,
      image: current.image,
      temperature: "Iced",
      sweetness: "Normal",
    });
  };

  const waLink = `https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent(
    `Halo Kopi Sore! Saya ingin memesan ${current.name} ☕`
  )}`;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-sand-50 pt-24 pb-12 sm:pt-28 md:pt-36 md:pb-20"
    >
      {/* Subtle organic light backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sand-200/50 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-sand-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-3/4 -translate-x-1/2 rounded-full bg-blush-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Tagline */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-200 pb-4 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Buka Sekarang • 08.00 – 22.00 WIB
          </span>
          <span className="text-espresso-700/60 hidden sm:inline">
            Jl. Sudirman No. 25, Bekasi
          </span>
        </div>

        {/* Hero Main Grid */}
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: Headline & Info */}
          <div className="lg:col-span-6 xl:col-span-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sand-300 bg-sand-100/80 px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase text-espresso-800">
              <span>☕</span> Temani Harimu dengan Kopi Sore
            </span>

            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.08] tracking-tight text-espresso-900 sm:text-5xl md:text-6xl xl:text-7xl">
              ORDER <br />
              <span className="text-terracotta italic font-normal font-[family-name:var(--font-script)]">
                artisanal
              </span>{" "}
              COFFEE
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-espresso-700/80 sm:text-base">
              Nikmati berbagai racikan kopi specialty segar dengan suasana warm-minimalist
              yang nyaman untuk bersantai, belajar, dan bekerja seharian.
            </p>

            {/* Drink Selector Tabs */}
            <div className="mt-6">
              <p className="text-[11px] font-bold tracking-wider uppercase text-espresso-700/70">
                Pilih Signature Favorit:
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {heroShowcaseDrinks.map((drink, idx) => (
                  <button
                    key={drink.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      selectedIdx === idx
                        ? "bg-espresso-900 text-sand-50 shadow-sm"
                        : "border border-sand-300 bg-sand-100/60 text-espresso-800 hover:bg-sand-200"
                    }`}
                  >
                    {drink.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-espresso-900 px-7 py-3.5 text-xs font-bold tracking-wider uppercase text-sand-50 shadow-md transition-all hover:bg-terracotta hover:shadow-lg active:scale-95"
              >
                <span>+ Masukkan Keranjang</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
                  Rp{current.price.toLocaleString("id-ID")}
                </span>
              </button>

              <a
                href="#menu"
                className="inline-flex items-center justify-center rounded-full border border-sand-300 bg-sand-100/80 px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-espresso-900 transition-all hover:border-espresso-900 hover:bg-sand-200 active:scale-95"
              >
                Lihat Semua Menu ↓
              </a>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-sand-200 pt-6">
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl font-black text-espresso-900">
                  100%
                </p>
                <p className="text-[11px] font-medium text-espresso-700/70">
                  Arabica Specialty
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl font-black text-espresso-900">
                  4.9★
                </p>
                <p className="text-[11px] font-medium text-espresso-700/70">
                  Rating 2.4k+ Ulasan
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl font-black text-espresso-900">
                  18k+
                </p>
                <p className="text-[11px] font-medium text-espresso-700/70">
                  Harga Mahasiswa
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Featured Showcase with organic stone frame */}
          <div className="relative flex justify-center lg:col-span-6 xl:col-span-6">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Organic travertine card */}
              <div className="relative overflow-hidden rounded-[2.5rem] border border-sand-200/90 bg-white p-4 shadow-xl sm:p-6">
                {/* Badge */}
                <div className="flex items-center justify-between pb-3">
                  <span className="rounded-full bg-sand-100 px-3 py-1 text-[11px] font-bold text-terracotta uppercase tracking-wider">
                    {current.tag}
                  </span>
                  <span className="text-xs font-semibold text-espresso-700/70">
                    ⭐ {current.rating} ({current.reviews})
                  </span>
                </div>

                {/* Real Photo Image container */}
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-sand-100">
                  <Image
                    key={current.image}
                    src={current.image}
                    alt={current.name}
                    fill
                    priority
                    className="object-cover transition-all duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 450px"
                  />
                  {/* Gradient shadow on image bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-sand-200">
                      Signature Series
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold sm:text-2xl">
                      {current.name}
                    </h3>
                  </div>
                </div>

                {/* Info footer */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-sand-50 p-3">
                  <div>
                    <p className="text-[11px] text-espresso-700/70">{current.subtitle}</p>
                    <p className="font-[family-name:var(--font-display)] text-lg font-bold text-terracotta-dark">
                      Rp{current.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="rounded-full bg-espresso-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-sand-50 transition-all hover:bg-terracotta"
                  >
                    + Pesan
                  </button>
                </div>
              </div>

              {/* Decorative floating pills */}
              <div className="absolute -bottom-4 -left-3 rounded-2xl border border-sand-200 bg-sand-50/95 px-4 py-2.5 shadow-lg backdrop-blur-xs sm:-left-6">
                <p className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                  Freshly Brewed
                </p>
                <p className="text-xs font-bold text-espresso-900">
                  Susu Segar &amp; Es Bersih 🧊
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee ticker bar */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-sand-200 bg-sand-100/70 py-3.5">
          <div className="animate-marquee gap-10 whitespace-nowrap text-xs font-bold tracking-widest uppercase text-espresso-800">
            {Array.from({ length: 4 }).flatMap((_, i) =>
              [
                "🌿 100% ARABICA SPECIALTY BEANS",
                "☕ KOPI SUSU AREN ASLI",
                "🛋️ COZY PLACE BUAT NUGAS & WFC",
                "⚡ FREE WI-FI & COLOKAN LISTRIK",
                "💰 HARGA MULAI RP18.000",
                "📍 JL. SUDIRMAN NO. 25 BEKASI",
              ].map((txt, j) => (
                <span key={`${i}-${j}`} className="flex items-center gap-4">
                  <span>{txt}</span>
                  <span className="text-terracotta">✦</span>
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
