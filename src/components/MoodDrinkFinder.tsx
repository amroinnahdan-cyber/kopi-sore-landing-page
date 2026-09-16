"use client";

import Image from "next/image";
import { useState } from "react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";
import { menuItems, type MenuItem } from "@/lib/data";
import { useCart } from "./CartProvider";

const questions = [
  {
    id: "mood",
    title: "1. Apa suasana hatimu sore ini?",
    options: [
      { label: "💻 Butuh fokus nugas & kerja", mood: "focus" },
      { label: "😴 Ngantuk berat butuh booster", mood: "energy" },
      { label: "🧘 Mau me-time santai & rileks", mood: "chill" },
      { label: "🍓 Mau yang manis bikin happy", mood: "sweet" },
    ],
  },
  {
    id: "profile",
    title: "2. Selera rasa minuman favoritmu?",
    options: [
      { label: "⚡ Pahit, pekat & clean tanpa ampas", type: "strong" },
      { label: "🥛 Creamy gurih & balance kopi-susu", type: "creamy" },
      { label: "🍯 Manis karamel & gula aren legit", type: "sweet" },
      { label: "🍃 Non-kopi segar & menenangkan", type: "noncoffee" },
    ],
  },
];

export default function MoodDrinkFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ mood?: string; type?: string }>({});
  const [matchedDrink, setMatchedDrink] = useState<MenuItem | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const { addItem } = useCart();

  const handleSelectOption = (key: "mood" | "type", val: string) => {
    sound.playClick();
    const updated = { ...answers, [key]: val };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      // Calculate match
      setIsCalculating(true);
      setTimeout(() => {
        let match = menuItems[0]; // default Kopi Susu Sore
        if (updated.type === "strong" || updated.mood === "energy") {
          match = menuItems.find((m) => m.id === "iced-americano") || menuItems[0];
        } else if (updated.type === "sweet" || updated.mood === "sweet") {
          match = menuItems.find((m) => m.id === "caramel-macchiato") || menuItems[0];
        } else if (updated.type === "noncoffee") {
          match = menuItems.find((m) => m.id === "kyoto-matcha") || menuItems[5];
        } else {
          match = menuItems.find((m) => m.id === "kopi-susu-sore") || menuItems[0];
        }

        setMatchedDrink(match);
        setIsCalculating(false);
        setStep(2); // results step
        sound.playSuccessChime();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#b86b45", "#d6c4ad", "#231812"],
        });
      }, 700);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setStep(0);
    setAnswers({});
    setMatchedDrink(null);
  };

  const handleAddToCart = () => {
    if (!matchedDrink) return;
    sound.playSuccessChime();
    addItem({
      id: matchedDrink.id,
      name: matchedDrink.name,
      price: matchedDrink.price,
      image: matchedDrink.image,
      temperature: matchedDrink.temperature === "Hot" ? "Hot" : "Iced",
      sweetness: "Normal",
    });
  };

  return (
    <section className="relative overflow-hidden bg-sand-50 py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-sand-200 bg-sand-100/80 p-8 shadow-xl backdrop-blur-xs sm:p-12">
          {/* Organic background shapes */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-sand-200 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blush-100 blur-2xl" />

          {/* Header */}
          <div className="relative text-center">
            <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
              Smart Barista Quiz
            </span>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-espresso-900 sm:text-4xl">
              Bingung Mau Pesan Apa? Temukan Kopi Sore-mu!
            </h3>
            <p className="mt-2 text-xs text-espresso-700/80 sm:text-sm">
              Jawab 2 pertanyaan singkat dan biarkan Barista Kopi Sore merekomendasikan menu yang pas
              buat mood kamu.
            </p>
          </div>

          {/* Content Step Card */}
          <div className="relative mt-8">
            {isCalculating ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-3xl text-white animate-spin">
                  ☕
                </div>
                <p className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold text-espresso-900">
                  Barista Sedang Meracik Rekomendasi Terbaik...
                </p>
              </div>
            ) : step < 2 ? (
              <div>
                <div className="mb-4 flex items-center justify-between text-xs font-bold text-espresso-700/60 uppercase">
                  <span>Langkah {step + 1} dari 2</span>
                  <div className="flex gap-1.5">
                    <span className={`h-2 w-8 rounded-full ${step >= 0 ? "bg-terracotta" : "bg-sand-300"}`} />
                    <span className={`h-2 w-8 rounded-full ${step >= 1 ? "bg-terracotta" : "bg-sand-300"}`} />
                  </div>
                </div>

                <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso-900 sm:text-xl">
                  {questions[step].title}
                </h4>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelectOption(step === 0 ? "mood" : "type", "mood" in opt ? opt.mood : opt.type)}
                      className="flex items-center justify-between rounded-2xl border border-sand-200 bg-white p-4 text-left font-semibold text-espresso-900 shadow-xs transition-all hover:-translate-y-0.5 hover:border-terracotta hover:bg-sand-50 hover:shadow-md active:scale-98"
                    >
                      <span className="text-xs sm:text-sm">{opt.label}</span>
                      <span className="text-terracotta">→</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : matchedDrink ? (
              /* RESULT CARD */
              <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-md sm:p-8">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  {/* Photo */}
                  <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl bg-sand-100">
                    <Image
                      src={matchedDrink.image}
                      alt={matchedDrink.name}
                      fill
                      className="object-cover"
                      sizes="176px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      ✨ 100% Cocok Dengan Mood Kamu!
                    </span>
                    <h4 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black text-espresso-900 sm:text-3xl">
                      {matchedDrink.name}
                    </h4>
                    <p className="text-xs font-semibold text-terracotta">{matchedDrink.tagline}</p>
                    <p className="mt-2 text-xs leading-relaxed text-espresso-700/80">
                      {matchedDrink.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                      <span className="font-[family-name:var(--font-display)] text-xl font-black text-espresso-900">
                        Rp{matchedDrink.price.toLocaleString("id-ID")}
                      </span>

                      <button
                        onClick={handleAddToCart}
                        className="rounded-full bg-espresso-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-sand-50 transition-all hover:bg-terracotta"
                      >
                        + Masukkan Keranjang
                      </button>

                      <button
                        onClick={handleReset}
                        className="rounded-full border border-sand-300 px-4 py-2 text-xs font-bold text-espresso-800 hover:bg-sand-100"
                      >
                        Ulangi Kuis ↺
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
