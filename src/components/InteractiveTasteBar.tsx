"use client";

import Image from "next/image";
import { useState } from "react";
import { menuItems } from "@/lib/data";
import { useCart } from "./CartProvider";

export default function InteractiveTasteBar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sweetness, setSweetness] = useState<"Normal" | "Less Sweet" | "No Sugar">("Normal");
  const [temperature, setTemperature] = useState<"Iced" | "Hot">("Iced");
  const [milkOption, setMilkOption] = useState<"Fresh Milk" | "Oat Milk (+Rp5k)">("Fresh Milk");
  const [feedback, setFeedback] = useState(false);

  const { addItem } = useCart();
  const currentItem = menuItems[selectedIndex];

  const calculatePrice = () => {
    let base = currentItem.price;
    if (milkOption.includes("Oat Milk")) base += 5000;
    return base;
  };

  const handleAddToCart = () => {
    addItem({
      id: currentItem.id,
      name: `${currentItem.name} (${milkOption.includes("Oat") ? "Oat Milk" : "Reguler"})`,
      price: calculatePrice(),
      image: currentItem.image,
      temperature,
      sweetness,
    });

    setFeedback(true);
    setTimeout(() => setFeedback(false), 2000);
  };

  return (
    <section id="interactive" className="relative bg-sand-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
            Interactive Experience
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-espresso-900 sm:text-4xl md:text-5xl">
            Racik Kopi Sesuai Seleramu
          </h2>
          <p className="mt-3 text-xs text-espresso-700/80 sm:text-sm">
            Geser pilihan minuman di bawah, atur level manis, es, dan jenis susu sebelum memesan.
          </p>
        </div>

        {/* DRINK SELECTOR THUMBNAILS (Horizontal Draggable Row) */}
        <div className="mt-10 flex gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {menuItems.map((item, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedIndex(idx)}
                className={`group flex shrink-0 items-center gap-3 rounded-2xl border p-2.5 transition-all ${
                  isSelected
                    ? "border-terracotta bg-white shadow-md ring-2 ring-terracotta/20"
                    : "border-sand-200 bg-sand-100/70 hover:bg-white"
                }`}
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-sand-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="text-left pr-2">
                  <p
                    className={`text-xs font-bold transition-colors ${
                      isSelected ? "text-terracotta-dark" : "text-espresso-900"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-[10px] text-espresso-700/60">
                    Rp{item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* MAIN CUSTOMIZER CARD */}
        <div className="mt-8 grid items-center gap-8 rounded-[2.5rem] border border-sand-200 bg-white p-6 shadow-lg md:grid-cols-12 md:p-10">
          {/* Left: Product Photo & Profile */}
          <div className="md:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-sand-100 shadow-inner">
              <Image
                src={currentItem.image}
                alt={currentItem.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-4 left-4 rounded-full bg-espresso-900/90 px-3.5 py-1 text-xs font-bold text-sand-50 backdrop-blur-xs">
                {currentItem.tagline}
              </div>
            </div>

            {/* Taste Meter Bars */}
            <div className="mt-5 space-y-2 rounded-2xl bg-sand-50 p-4">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-espresso-800">
                  <span>Tingkat Kemanisan</span>
                  <span className="text-terracotta">{currentItem.sweetness}/5</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-sand-200">
                  <div
                    className="h-full rounded-full bg-terracotta"
                    style={{ width: `${(currentItem.sweetness / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-espresso-800">
                  <span>Intensitas Kopi</span>
                  <span className="text-espresso-900">{currentItem.intensity}/5</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-sand-200">
                  <div
                    className="h-full rounded-full bg-espresso-900"
                    style={{ width: `${(currentItem.intensity / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="flex flex-col justify-between md:col-span-7 md:pl-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-terracotta uppercase">
                {currentItem.category}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-espresso-900 sm:text-4xl">
                {currentItem.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-espresso-700/80 sm:text-sm">
                {currentItem.description}
              </p>

              {/* Customizer Option 1: Temperature */}
              <div className="mt-6">
                <label className="text-xs font-bold tracking-wider text-espresso-900 uppercase">
                  1. Sajian Suhu:
                </label>
                <div className="mt-2 flex gap-2.5">
                  {(["Iced", "Hot"] as const).map((temp) => (
                    <button
                      key={temp}
                      onClick={() => setTemperature(temp)}
                      className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all ${
                        temperature === temp
                          ? "bg-espresso-900 text-sand-50 shadow-sm"
                          : "border border-sand-300 bg-sand-50 text-espresso-800 hover:bg-sand-100"
                      }`}
                    >
                      {temp === "Iced" ? "🧊 Dingin (Iced)" : "☕ Hangat (Hot)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customizer Option 2: Sweetness */}
              <div className="mt-5">
                <label className="text-xs font-bold tracking-wider text-espresso-900 uppercase">
                  2. Level Gula:
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(["Normal", "Less Sweet", "No Sugar"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSweetness(lvl)}
                      className={`rounded-xl py-2.5 text-xs font-bold transition-all ${
                        sweetness === lvl
                          ? "bg-terracotta text-white shadow-sm"
                          : "border border-sand-300 bg-sand-50 text-espresso-800 hover:bg-sand-100"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customizer Option 3: Milk Type */}
              <div className="mt-5">
                <label className="text-xs font-bold tracking-wider text-espresso-900 uppercase">
                  3. Jenis Susu:
                </label>
                <div className="mt-2 flex gap-2.5">
                  {(["Fresh Milk", "Oat Milk (+Rp5k)"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMilkOption(m)}
                      className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all ${
                        milkOption === m
                          ? "bg-espresso-900 text-sand-50 shadow-sm"
                          : "border border-sand-300 bg-sand-50 text-espresso-800 hover:bg-sand-100"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Total & Add button */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sand-200 pt-6">
              <div>
                <p className="text-[11px] font-semibold text-espresso-700/70">
                  Total Harga Racikan:
                </p>
                <p className="font-[family-name:var(--font-display)] text-2xl font-black text-terracotta-dark">
                  Rp{calculatePrice().toLocaleString("id-ID")}
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 rounded-full bg-espresso-900 px-8 py-3.5 text-xs font-bold tracking-wider text-sand-50 uppercase shadow-lg transition-all hover:bg-terracotta active:scale-95"
              >
                <span>{feedback ? "✓ Berhasil Masuk!" : "+ Masukkan Keranjang"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
