"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";
import { useCart } from "./CartProvider";

type BaseOption = {
  id: string;
  name: string;
  color: string;
  darkColor: string;
  caffeine: number;
  calories: number;
  price: number;
};

type MilkOption = {
  id: string;
  name: string;
  color: string;
  creaminess: number;
  calories: number;
  price: number;
};

type SyrupOption = {
  id: string;
  name: string;
  color: string;
  sweetness: number;
  price: number;
};

type IceLevel = "None" | "Half" | "Full";
type ToppingOption = {
  id: string;
  name: string;
  price: number;
  badge: string;
};

const bases: BaseOption[] = [
  { id: "espresso", name: "Double Shot Espresso", color: "#3d2314", darkColor: "#1f1008", caffeine: 150, calories: 10, price: 15000 },
  { id: "coldbrew", name: "18-Hour Cold Brew", color: "#2b180d", darkColor: "#140a04", caffeine: 180, calories: 5, price: 17000 },
  { id: "matcha", name: "Kyoto Ceremonial Matcha", color: "#4f772d", darkColor: "#2b4c16", caffeine: 70, calories: 35, price: 18000 },
  { id: "chocolate", name: "Belgian Dark Cocoa", color: "#4a2810", darkColor: "#2e1405", caffeine: 20, calories: 95, price: 16000 },
];

const milks: MilkOption[] = [
  { id: "fresh", name: "Fresh Full Cream Milk", color: "#fbf6ec", creaminess: 4, calories: 120, price: 3000 },
  { id: "oat", name: "Oatly Barista Edition (Oat)", color: "#ece2d0", creaminess: 5, calories: 90, price: 6000 },
  { id: "almond", name: "California Almond Milk", color: "#f4ede2", creaminess: 3, calories: 60, price: 6000 },
  { id: "condensed", name: "Condensed Sweet Milk", color: "#f9ecc2", creaminess: 5, calories: 150, price: 4000 },
];

const syrups: SyrupOption[] = [
  { id: "aren", name: "Gula Aren Organik", color: "#8a4f1d", sweetness: 4, price: 3000 },
  { id: "caramel", name: "Salted Butter Caramel", color: "#c67d26", sweetness: 5, price: 4000 },
  { id: "vanilla", name: "Madagascar Vanilla Bean", color: "#d8a45f", sweetness: 3, price: 4000 },
  { id: "none", name: "Tanpa Sirup (Unsweetened)", color: "transparent", sweetness: 0, price: 0 },
];

const toppings: ToppingOption[] = [
  { id: "none", name: "Tanpa Topping", price: 0, badge: "Original" },
  { id: "foam", name: "Sea Salt Cold Foam", price: 4000, badge: "Creamy ✨" },
  { id: "caramel-drizzle", name: "Caramel Drizzle Art", price: 3000, badge: "Sweet 🍯" },
  { id: "cinnamon", name: "Cinnamon & Cocoa Dust", price: 2000, badge: "Aromatic 🍂" },
];

export default function InteractiveCupStudio() {
  const [selectedBase, setSelectedBase] = useState<BaseOption>(bases[0]);
  const [selectedMilk, setSelectedMilk] = useState<MilkOption>(milks[0]);
  const [selectedSyrup, setSelectedSyrup] = useState<SyrupOption>(syrups[0]);
  const [iceLevel, setIceLevel] = useState<IceLevel>("Full");
  const [selectedTopping, setSelectedTopping] = useState<ToppingOption>(toppings[1]);
  const [cupName, setCupName] = useState("Kopi Soreku ✨");
  const [isPouring, setIsPouring] = useState(false);

  const { addItem } = useCart();

  const totalPrice =
    selectedBase.price + selectedMilk.price + selectedSyrup.price + selectedTopping.price;
  const totalCalories =
    selectedBase.calories + selectedMilk.calories + (selectedSyrup.sweetness * 25) + (selectedTopping.id !== "none" ? 45 : 0);
  const totalCaffeine = selectedBase.caffeine;

  const handleBaseChange = (b: BaseOption) => {
    setSelectedBase(b);
    sound.playPour();
    triggerPourAnimation();
  };

  const handleMilkChange = (m: MilkOption) => {
    setSelectedMilk(m);
    sound.playPour();
    triggerPourAnimation();
  };

  const handleSyrupChange = (s: SyrupOption) => {
    setSelectedSyrup(s);
    sound.playClick();
  };

  const handleIceChange = (ice: IceLevel) => {
    setIceLevel(ice);
    sound.playIceClink();
  };

  const triggerPourAnimation = () => {
    setIsPouring(true);
    setTimeout(() => setIsPouring(false), 500);
  };

  const handleAddToCart = () => {
    sound.playSuccessChime();

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#b86b45", "#e8dccb", "#35261d", "#f7e6e0"],
    });

    addItem({
      id: `custom-${Date.now()}`,
      name: `Custom Blend: ${cupName || "Special Creation"}`,
      price: totalPrice,
      image: "https://images.pexels.com/photos/18281882/pexels-photo-18281882.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      temperature: iceLevel === "None" ? "Hot" : "Iced",
      sweetness: selectedSyrup.sweetness > 3 ? "Normal" : selectedSyrup.sweetness === 0 ? "No Sugar" : "Less Sweet",
      note: `${selectedBase.name} + ${selectedMilk.name} + ${selectedSyrup.name} + ${selectedTopping.name} (${iceLevel} Ice)`,
    });
  };

  return (
    <section id="interactive" className="relative overflow-hidden bg-sand-100/70 py-20 md:py-28">
      {/* Glow effect */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-sand-300/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-terracotta/40 bg-white px-3.5 py-1 text-[11px] font-bold tracking-[0.2em] text-terracotta uppercase shadow-xs">
            ✨ Interactive Virtual Barista Lab
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold text-espresso-900 sm:text-4xl md:text-5xl">
            Desain Resep Kopimu Sendiri
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-espresso-700/80 sm:text-sm">
            Eksperimen dengan layer cairan, pilihan susu nabati, sirup organik, hingga nama unikmu
            pada gelas secara visual real-time!
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: Live Dynamic Animated Glass Visualizer */}
          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <div className="relative flex h-[480px] w-full max-w-[320px] flex-col items-center justify-end rounded-[3rem] border border-sand-200/80 bg-white/70 p-6 shadow-2xl backdrop-blur-md">
              {/* Floating ambient tag */}
              <div className="absolute top-5 left-6 right-6 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-espresso-700/70">
                <span>Kopi Sore Lab</span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Preview
                </span>
              </div>

              {/* THE GLASS CUP CONTAINER */}
              <div className="relative mb-2 h-[320px] w-[200px] overflow-hidden rounded-b-[40px] rounded-t-[10px] border-4 border-white/80 bg-gradient-to-b from-white/30 to-sand-100/40 shadow-2xl backdrop-blur-xs ring-4 ring-sand-300/30">
                {/* Straw */}
                <div className="absolute -top-12 right-12 z-20 h-28 w-3 rotate-12 rounded-full bg-amber-800/80 shadow-md ring-1 ring-white/50" />

                {/* Topping Foam Layer */}
                {selectedTopping.id === "foam" && (
                  <div className="absolute top-0 left-0 right-0 z-10 h-10 bg-gradient-to-b from-white via-sand-50 to-sand-100/90 shadow-sm transition-all duration-500">
                    <div className="flex h-full items-center justify-center text-[10px] font-bold text-espresso-800/60">
                      Sea Salt Foam
                    </div>
                  </div>
                )}

                {selectedTopping.id === "caramel-drizzle" && (
                  <div className="absolute top-0 left-0 right-0 z-10 h-6 bg-amber-600/70 blur-xs transition-all duration-500" />
                )}

                {selectedTopping.id === "cinnamon" && (
                  <div className="absolute top-0 left-0 right-0 z-10 h-3 bg-amber-950/60 opacity-80" />
                )}

                {/* Ice Cubes floating inside */}
                {iceLevel !== "None" && (
                  <div className="absolute inset-0 z-10 pointer-events-none flex flex-wrap justify-center gap-2 p-4 pt-10">
                    <div className="h-8 w-8 rotate-12 rounded-lg border border-white/60 bg-white/40 shadow-inner backdrop-blur-xs animate-bounce" style={{ animationDuration: "3s" }} />
                    <div className="h-9 w-9 -rotate-6 rounded-lg border border-white/60 bg-white/40 shadow-inner backdrop-blur-xs animate-bounce" style={{ animationDuration: "4s" }} />
                    {iceLevel === "Full" && (
                      <>
                        <div className="h-8 w-8 rotate-45 rounded-lg border border-white/60 bg-white/40 shadow-inner backdrop-blur-xs animate-bounce" style={{ animationDuration: "3.5s" }} />
                        <div className="h-7 w-7 -rotate-12 rounded-lg border border-white/60 bg-white/40 shadow-inner backdrop-blur-xs" />
                      </>
                    )}
                  </div>
                )}

                {/* Liquid Layers */}
                <div className={`relative h-full w-full flex flex-col justify-end transition-all duration-500 ${isPouring ? "scale-95" : "scale-100"}`}>
                  {/* Milk / Cream swirl Layer (Top to Mid) */}
                  <div
                    className="w-full transition-all duration-700"
                    style={{
                      height: "55%",
                      backgroundColor: selectedMilk.color,
                      backgroundImage: `radial-gradient(circle at 50% 30%, ${selectedMilk.color}, ${selectedBase.color} 90%)`,
                      opacity: 0.95,
                    }}
                  />

                  {/* Espresso Base Layer (Bottom) */}
                  <div
                    className="w-full transition-all duration-700"
                    style={{
                      height: "45%",
                      backgroundColor: selectedBase.color,
                      backgroundImage: `linear-gradient(to bottom, ${selectedBase.color}, ${selectedBase.darkColor})`,
                    }}
                  />

                  {/* Syrup drizzle layer at the very bottom */}
                  {selectedSyrup.id !== "none" && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-4 transition-all duration-500"
                      style={{ backgroundColor: selectedSyrup.color, opacity: 0.85 }}
                    />
                  )}
                </div>

                {/* Live Glass Label Sticker */}
                <div className="absolute top-1/2 left-1/2 z-20 w-36 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-xl border border-sand-300 bg-sand-50/95 px-2.5 py-2 text-center shadow-lg backdrop-blur-xs">
                  <p className="text-[8px] font-black tracking-widest text-terracotta uppercase">
                    KOPI SORE • SPECIAL ORDER
                  </p>
                  <p className="mt-0.5 font-[family-name:var(--font-script)] text-base font-bold text-espresso-900 truncate">
                    {cupName || "Minuman Spesial"}
                  </p>
                  <p className="text-[8px] text-espresso-700/70">
                    {selectedBase.name.split(" ")[0]} • {selectedMilk.name.split(" ")[0]}
                  </p>
                </div>
              </div>

              {/* Live Specs Bar */}
              <div className="mt-3 grid w-full grid-cols-3 gap-2 rounded-2xl bg-sand-100/90 p-2.5 text-center text-xs">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-espresso-700/60 block">Caffeine</span>
                  <span className="font-bold text-espresso-900">{totalCaffeine} mg</span>
                </div>
                <div className="border-x border-sand-300/80">
                  <span className="text-[9px] uppercase tracking-wider text-espresso-700/60 block">Calories</span>
                  <span className="font-bold text-espresso-900">~{totalCalories} kcal</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-espresso-700/60 block">Harga</span>
                  <span className="font-black text-terracotta-dark">Rp{totalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive Customization Controls */}
          <div className="lg:col-span-7">
            <div className="space-y-6 rounded-[2.5rem] border border-sand-200 bg-white p-6 shadow-xl sm:p-8">
              {/* Cup Custom Label Name Input */}
              <div>
                <label className="text-xs font-bold tracking-wider text-espresso-900 uppercase">
                  ✍️ Beri Nama Stiker Gelasmu:
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={cupName}
                  onChange={(e) => setCupName(e.target.value)}
                  placeholder="Contoh: Kopi Semangat Nugas ☕"
                  className="mt-1.5 w-full rounded-2xl border border-sand-300 bg-sand-50 px-4 py-2.5 text-sm font-semibold text-espresso-900 outline-hidden transition-all focus:border-terracotta focus:bg-white"
                />
              </div>

              {/* Step 1: Base */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold tracking-wider text-espresso-900 uppercase">
                    1. Pilih Base Minuman:
                  </label>
                  <span className="text-xs font-semibold text-terracotta">{selectedBase.name}</span>
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {bases.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleBaseChange(b)}
                      className={`flex flex-col items-center justify-center rounded-2xl p-2.5 text-center transition-all ${
                        selectedBase.id === b.id
                          ? "border-2 border-espresso-900 bg-espresso-900 text-sand-50 shadow-md"
                          : "border border-sand-200 bg-sand-50 text-espresso-900 hover:bg-sand-100"
                      }`}
                    >
                      <span className="text-xs font-bold">{b.name.split(" ")[0]}</span>
                      <span className="text-[10px] opacity-70">Rp{b.price.toLocaleString("id-ID")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Milk Option */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold tracking-wider text-espresso-900 uppercase">
                    2. Pilihan Susu:
                  </label>
                  <span className="text-xs font-semibold text-terracotta">{selectedMilk.name}</span>
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {milks.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleMilkChange(m)}
                      className={`flex flex-col items-center justify-center rounded-2xl p-2.5 text-center transition-all ${
                        selectedMilk.id === m.id
                          ? "border-2 border-terracotta bg-terracotta text-white shadow-md"
                          : "border border-sand-200 bg-sand-50 text-espresso-900 hover:bg-sand-100"
                      }`}
                    >
                      <span className="text-xs font-bold">{m.name.split(" ")[0]}</span>
                      <span className="text-[10px] opacity-80">+Rp{m.price.toLocaleString("id-ID")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Sweetener & Syrup */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold tracking-wider text-espresso-900 uppercase">
                    3. Sirup / Gula:
                  </label>
                  <span className="text-xs font-semibold text-terracotta">{selectedSyrup.name}</span>
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {syrups.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSyrupChange(s)}
                      className={`flex flex-col items-center justify-center rounded-2xl p-2.5 text-center transition-all ${
                        selectedSyrup.id === s.id
                          ? "border-2 border-espresso-900 bg-espresso-900 text-sand-50 shadow-md"
                          : "border border-sand-200 bg-sand-50 text-espresso-900 hover:bg-sand-100"
                      }`}
                    >
                      <span className="text-xs font-bold">{s.name.split(" ")[0]}</span>
                      <span className="text-[10px] opacity-70">
                        {s.price > 0 ? `+Rp${s.price.toLocaleString("id-ID")}` : "Free"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Ice Level & Toppings */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Ice */}
                <div>
                  <label className="text-xs font-bold tracking-wider text-espresso-900 uppercase block">
                    4. Es Batu (Ice):
                  </label>
                  <div className="mt-2 flex gap-1.5">
                    {(["None", "Half", "Full"] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => handleIceChange(lvl)}
                        className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                          iceLevel === lvl
                            ? "bg-espresso-900 text-sand-50"
                            : "border border-sand-300 bg-sand-50 text-espresso-800 hover:bg-sand-100"
                        }`}
                      >
                        {lvl === "None" ? "Hot 🔥" : lvl === "Half" ? "50% 🧊" : "100% 🧊🧊"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topping */}
                <div>
                  <label className="text-xs font-bold tracking-wider text-espresso-900 uppercase block">
                    5. Topping Spesial:
                  </label>
                  <select
                    value={selectedTopping.id}
                    onChange={(e) => {
                      const t = toppings.find((item) => item.id === e.target.value) || toppings[0];
                      setSelectedTopping(t);
                      sound.playClick();
                    }}
                    className="mt-2 w-full rounded-xl border border-sand-300 bg-sand-50 px-3 py-2 text-xs font-semibold text-espresso-900 outline-hidden focus:border-terracotta"
                  >
                    {toppings.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} {t.price > 0 ? `(+Rp${t.price.toLocaleString("id-ID")})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sand-200 pt-6">
                <div>
                  <span className="text-[11px] font-bold text-espresso-700/70 uppercase tracking-wider block">
                    Total Racikan Custom
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-3xl font-black text-terracotta-dark">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 rounded-full bg-espresso-900 px-8 py-4 text-xs font-bold tracking-wider uppercase text-sand-50 shadow-xl transition-all hover:bg-terracotta hover:shadow-2xl active:scale-95"
                >
                  <span>☕ Masukkan Racikan ke Keranjang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
