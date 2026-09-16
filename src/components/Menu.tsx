"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { categories, menuItems, type Category, type MenuItem } from "@/lib/data";
import { useCart } from "./CartProvider";

const formatRupiah = (n: number) =>
  "Rp" + n.toLocaleString("id-ID", { maximumFractionDigits: 0 });

export default function Menu() {
  const [active, setActive] = useState<Category | "All">("All");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCart();

  const filtered =
    active === "All"
      ? menuItems
      : menuItems.filter((m) => m.category === active);

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const handleAdd = (m: MenuItem) => {
    addItem({
      id: m.id,
      name: m.name,
      price: m.price,
      image: m.image,
    });
    openCart();
  };

  return (
    <section id="menu" className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">
              Our Menu
            </span>
            <h2 className="mt-2 flex items-baseline gap-3 font-[family-name:var(--font-playfair)] text-4xl font-black text-espresso md:text-6xl">
              Menu
              <span className="font-[family-name:var(--font-dancing)] text-2xl font-normal text-terracotta md:text-4xl">
                drinks
              </span>
            </h2>
          </div>
          <button
            onClick={openCart}
            className="hidden rounded-full bg-espresso px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-mocha md:inline-block"
          >
            my basket →
          </button>
        </div>

        {/* Category pills */}
        <div className="mt-8 flex flex-wrap gap-2 md:gap-3">
          {(["All", ...categories] as const).map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all md:px-5 md:py-2.5 md:text-sm ${
                  isActive
                    ? "bg-terracotta text-white shadow-md shadow-terracotta/30"
                    : "bg-bone text-espresso/70 hover:bg-beige"
                }`}
              >
                {cat === "All" ? "Semua" : cat}
              </button>
            );
          })}
        </div>

        {/* Horizontal scroller with arrows */}
        <div className="relative mt-10">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-espresso text-cream shadow-lg transition-colors hover:bg-terracotta md:grid"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-espresso text-cream shadow-lg transition-colors hover:bg-terracotta md:grid"
          >
            ›
          </button>

          <div
            ref={scrollerRef}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:-mx-8 md:gap-6 md:px-8"
          >
            {filtered.map((item) => (
              <DrinkCard
                key={item.id}
                item={item}
                onAdd={() => handleAdd(item)}
              />
            ))}
          </div>
        </div>

        {/* Mobile basket button */}
        <div className="mt-6 flex justify-center md:hidden">
          <button
            onClick={openCart}
            className="rounded-full bg-espresso px-6 py-2.5 text-sm font-semibold text-cream"
          >
            my basket →
          </button>
        </div>
      </div>
    </section>
  );
}

function DrinkCard({
  item,
  onAdd,
}: {
  item: MenuItem;
  onAdd: () => void;
}) {
  return (
    <div className="drink-card group relative w-[240px] shrink-0 snap-start overflow-hidden rounded-[28px] bg-bone p-5 shadow-[0_10px_30px_-10px_rgba(107,79,59,0.25)] sm:w-[260px]">
      {item.badge && (
        <span className="absolute top-4 left-4 z-10 rounded-full bg-terracotta px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          {item.badge}
        </span>
      )}

      <div className="relative mx-auto mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-beige/50">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="drink-img object-cover"
          sizes="260px"
        />
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold leading-tight text-espresso">
          {item.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-espresso/60">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-espresso">
            {formatRupiah(item.price)}
          </span>
          <button
            onClick={onAdd}
            className="rounded-full border-2 border-espresso px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-espresso transition-all hover:bg-espresso hover:text-cream"
          >
            to cart
          </button>
        </div>
      </div>
    </div>
  );
}
