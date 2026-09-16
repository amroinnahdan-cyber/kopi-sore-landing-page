"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { categories, menuItems, type Category, type MenuItem } from "@/lib/data";
import { useCart } from "./CartProvider";

const formatRupiah = (n: number) =>
  "Rp" + n.toLocaleString("id-ID", { maximumFractionDigits: 0 });

export default function MenuDraggable() {
  const [activeCategory, setActiveCategory] = useState<Category>("Semua");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const filteredItems =
    activeCategory === "Semua"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  // Update scroll progress bar
  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((el.scrollLeft / maxScroll) * 100);
    } else {
      setScrollProgress(0);
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [filteredItems]);

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = sliderRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.6; // multiplier for smooth drag feel
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Button navigation
  const scrollStep = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const offset = direction === "left" ? -320 : 320;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleAddToCart = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      temperature: item.temperature === "Hot" ? "Hot" : "Iced",
      sweetness: "Normal",
    });

    setAddedToast(`+1 ${item.name} ditambahkan!`);
    setTimeout(() => setAddedToast(null), 2400);
  };

  return (
    <section id="menu" className="relative overflow-hidden bg-sand-100/60 py-20 md:py-28">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-espresso-900 px-5 py-2.5 text-xs font-bold text-sand-50 shadow-2xl transition-all">
          ✨ {addedToast}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
              Specialty Menu • Fresh Brew
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-espresso-900 sm:text-4xl md:text-5xl">
              Menu Kopi &amp; Minuman
            </h2>
            <p className="mt-2 max-w-xl text-xs text-espresso-700/80 sm:text-sm">
              <span className="font-semibold text-terracotta">👉 Tip:</span> Klik &amp; geser
              (drag) kartu ke samping untuk melihat menu lainnya, atau gunakan tombol panah.
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollStep("left")}
              aria-label="Geser ke kiri"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-300 bg-sand-50 text-espresso-900 shadow-sm transition-all hover:bg-espresso-900 hover:text-sand-50 active:scale-90"
            >
              ←
            </button>
            <button
              onClick={() => scrollStep("right")}
              aria-label="Geser ke kanan"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-300 bg-sand-50 text-espresso-900 shadow-sm transition-all hover:bg-espresso-900 hover:text-sand-50 active:scale-90"
            >
              →
            </button>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-espresso-900 text-sand-50 shadow-md"
                    : "border border-sand-300 bg-sand-50 text-espresso-800 hover:bg-sand-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* DRAGGABLE CAROUSEL CONTAINER */}
        <div className="relative mt-8">
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`carousel-draggable flex gap-5 overflow-x-auto pb-6 pt-2 select-none no-scrollbar ${
              isDragging ? "is-dragging" : "snap-x snap-mandatory"
            }`}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="menu-card-editorial group relative flex w-[270px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-sand-200/90 bg-white p-4 shadow-sm sm:w-[290px]"
              >
                {/* Image container */}
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-sand-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    sizes="290px"
                  />
                  {/* Badge */}
                  {item.badge && (
                    <span className="absolute top-3 left-3 rounded-full bg-espresso-900/90 px-3 py-1 text-[10px] font-bold text-sand-50 backdrop-blur-xs">
                      {item.badge}
                    </span>
                  )}
                  {/* Temperature Tag */}
                  <span className="absolute top-3 right-3 rounded-full bg-white/85 px-2.5 py-0.5 text-[10px] font-bold text-espresso-900 shadow-xs backdrop-blur-xs">
                    {item.temperature === "Both" ? "Hot / Ice" : item.temperature}
                  </span>
                </div>

                {/* Content info */}
                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso-900">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-[11px] font-semibold text-terracotta">
                      {item.tagline}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-espresso-700/80 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tasting notes pills */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {item.tastingNotes.map((note) => (
                        <span
                          key={note}
                          className="rounded-md bg-sand-100 px-2 py-0.5 text-[10px] font-medium text-espresso-800"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Cart CTA */}
                  <div className="mt-4 flex items-center justify-between border-t border-sand-200/80 pt-3.5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-espresso-700/60 block">
                        Harga
                      </span>
                      <span className="font-[family-name:var(--font-display)] text-base font-black text-espresso-900">
                        {formatRupiah(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="ml-1.5 text-[11px] text-espresso-700/40 line-through">
                          {formatRupiah(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-espresso-900 px-3.5 py-2 text-xs font-bold text-sand-50 transition-all hover:bg-terracotta active:scale-95"
                    >
                      <span>+</span>
                      <span>to cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Scroll Progress Bar */}
          <div className="mt-4 flex items-center gap-4">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand-200">
              <div
                className="h-full rounded-full bg-terracotta transition-all duration-150"
                style={{ width: `${Math.max(15, scrollProgress)}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold tracking-wider text-espresso-700/60 uppercase">
              {filteredItems.length} Pilihan Minuman
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
