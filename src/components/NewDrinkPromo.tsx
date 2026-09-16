"use client";

import Image from "next/image";
import { business } from "@/lib/data";
import { useCart } from "./CartProvider";

export default function NewDrinkPromo() {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: "coconut-iced-latte-launch",
      name: "Toasted Coconut Iced Latte",
      price: 24000,
      image: "https://images.pexels.com/photos/18281882/pexels-photo-18281882.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      temperature: "Iced",
      sweetness: "Normal",
    });
  };

  const waLink = `https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent(
    "Halo Kopi Sore! Saya ingin pesan promo New Launch Toasted Coconut Iced Latte (Rp24.000) 🥥☕"
  )}`;

  return (
    <section className="relative overflow-hidden bg-blush-100 py-20 md:py-28">
      {/* Subtle organic gradient shapes */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-terracotta/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Text details */}
          <div className="lg:col-span-6">
            <div className="flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-espresso-900 sm:text-5xl md:text-6xl">
                New
              </span>
              <span className="font-[family-name:var(--font-script)] text-2xl font-normal text-terracotta sm:text-3xl md:text-4xl">
                selection
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-espresso-900 sm:text-5xl md:text-6xl">
              drink
            </h3>

            <div className="mt-6">
              <span className="rounded-full bg-terracotta/20 px-3 py-1 text-[11px] font-bold text-terracotta uppercase tracking-wider">
                Limited Season Launch 🥥
              </span>
              <h4 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-espresso-900 sm:text-3xl">
                Toasted Coconut Iced Latte
              </h4>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-espresso-700/80 sm:text-sm">
                Perpaduan double shot espresso Arabica dengan roasted coconut milk,
                karamel kelapa gurih, dan es batu kristal. Segar, creamy, dan tidak terlalu manis.
              </p>
            </div>

            {/* Price display */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-[family-name:var(--font-display)] text-3xl font-black text-espresso-900 sm:text-4xl">
                Rp24.000
              </span>
              <span className="text-base text-espresso-700/40 line-through sm:text-lg">
                Rp30.000
              </span>
              <span className="rounded-md bg-terracotta px-2 py-0.5 text-xs font-bold text-white">
                Diskon 20%
              </span>
            </div>

            {/* Feature spec boxes */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-espresso-900/10 pt-6">
              <div className="rounded-2xl bg-white/60 p-3 text-center backdrop-blur-xs">
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso-900">
                  3 Syrup
                </p>
                <p className="text-[10px] text-espresso-700/70">Vanilla • Coconut • Caramel</p>
              </div>

              <div className="rounded-2xl bg-white/60 p-3 text-center backdrop-blur-xs">
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso-900">
                  Double
                </p>
                <p className="text-[10px] text-espresso-700/70">Shot Arabica Roast</p>
              </div>

              <div className="rounded-2xl bg-white/60 p-3 text-center backdrop-blur-xs">
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-terracotta">
                  20% OFF
                </p>
                <p className="text-[10px] text-espresso-700/70">Promo Launching</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <button
                onClick={handleAddToCart}
                className="rounded-full bg-espresso-900 px-7 py-3.5 text-xs font-bold tracking-wider text-sand-50 uppercase shadow-md transition-all hover:bg-terracotta active:scale-95"
              >
                + Masukkan Keranjang
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-espresso-900/40 bg-white/70 px-6 py-3.5 text-xs font-bold tracking-wider text-espresso-900 uppercase transition-all hover:bg-espresso-900 hover:text-sand-50 active:scale-95"
              >
                Pesan via WhatsApp
              </a>
            </div>
          </div>

          {/* Right Showcase with real photography */}
          <div className="relative flex justify-center lg:col-span-6">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] border border-white/60 bg-white p-4 shadow-xl">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-sand-100">
                  <Image
                    src="https://images.pexels.com/photos/18281882/pexels-photo-18281882.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                    alt="Toasted Coconut Iced Latte with cream swirl"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="450px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso-900/80 via-espresso-900/30 to-transparent p-5 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-sand-200">
                      Signature Release
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-xl font-bold">
                      Toasted Coconut Latte
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating discount badge */}
              <div className="absolute -top-4 -right-4 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-terracotta text-white shadow-lg animate-wave-float sm:h-24 sm:w-24">
                <span className="text-[9px] font-bold uppercase tracking-wider opacity-90">
                  Special
                </span>
                <span className="font-[family-name:var(--font-display)] text-2xl font-black leading-none sm:text-3xl">
                  20%
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider opacity-90">
                  SALE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
