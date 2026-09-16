"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";

const prizes = [
  { label: "Diskon 20%", code: "SORE20OFF", desc: "Potongan 20% untuk semua menu!" },
  { label: "Free Oat Milk", code: "FREEOAT", desc: "Gratis upgrade ke Oatly Barista Milk!" },
  { label: "Diskon Rp5.000", code: "HEMAT5K", desc: "Potongan langsung Rp5.000!" },
  { label: "Free Topping", code: "TOPPINGFREE", desc: "Gratis Sea Salt Cold Foam / Drizzle!" },
  { label: "Diskon 15%", code: "SORE15", desc: "Potongan 15% pesanan pertama!" },
  { label: "Buy 1 Get 1", code: "BOGOAREN", desc: "Beli 1 Kopi Susu Sore Gratis 1!" },
];

export default function LuckySpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<(typeof prizes)[0] | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    sound.playClick();

    // Pick a random prize
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const degreesPerSlice = 360 / prizes.length;
    // Calculate final rotation (at least 5 full spins + slice offset)
    const extraSpins = 360 * 6;
    const targetDegree = extraSpins + (360 - (prizeIndex * degreesPerSlice + degreesPerSlice / 2));
    
    setRotation(targetDegree);

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      setWonPrize(prizes[prizeIndex]);
      sound.playSuccessChime();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#b86b45", "#f4ede2", "#231812", "#4f772d"],
      });
    }, 4000);
  };

  return (
    <section className="relative overflow-hidden bg-sand-100/70 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Text */}
          <div className="text-center lg:col-span-6 lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sand-300 bg-white px-3.5 py-1 text-[11px] font-bold tracking-[0.2em] text-terracotta uppercase shadow-xs">
              🎡 Roda Keberuntungan Kopi Sore
            </span>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold text-espresso-900 sm:text-4xl">
              Putar &amp; Dapatkan Voucher Diskon Hari Ini!
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-espresso-700/80 sm:text-sm">
              Coba keberuntunganmu! Setiap pengunjung berhak mendapatkan 1x kesempatan memutar roda
              hadiah untuk mendapatkan promo diskon kopi.
            </p>

            {wonPrize ? (
              <div className="mt-6 rounded-3xl border-2 border-dashed border-terracotta bg-white p-6 shadow-lg">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  🎉 Selamat! Kamu Mendapatkan:
                </span>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black text-espresso-900">
                  {wonPrize.label}
                </p>
                <p className="mt-1 text-xs text-espresso-700/80">{wonPrize.desc}</p>
                <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-sand-100 p-3 lg:justify-start">
                  <span className="text-xs font-semibold text-espresso-700">Kode Kupon:</span>
                  <span className="font-mono text-sm font-black tracking-wider text-terracotta">
                    {wonPrize.code}
                  </span>
                </div>
                <p className="mt-2 text-[10px] text-espresso-700/60">
                  *Tunjukkan kode ini saat pesan via WhatsApp atau di kasir Kopi Sore.
                </p>
              </div>
            ) : (
              <div className="mt-8 flex justify-center lg:justify-start">
                <button
                  onClick={spinWheel}
                  disabled={isSpinning || hasSpun}
                  className="rounded-full bg-espresso-900 px-8 py-4 text-xs font-bold tracking-wider uppercase text-sand-50 shadow-xl transition-all hover:bg-terracotta hover:shadow-2xl active:scale-95 disabled:opacity-60"
                >
                  {isSpinning ? "Roda Sedang Berputar..." : "🎡 PUTAR RODA SEKARANG"}
                </button>
              </div>
            )}
          </div>

          {/* Right: The Interactive Visual Spin Wheel */}
          <div className="flex flex-col items-center justify-center lg:col-span-6">
            <div className="relative flex h-[340px] w-[340px] items-center justify-center sm:h-[380px] sm:w-[380px]">
              {/* Center Pointer Arrow */}
              <div className="absolute -top-3 z-30 flex flex-col items-center">
                <div className="h-0 w-0 border-x-8 border-t-[20px] border-x-transparent border-t-espresso-900 drop-shadow-md" />
              </div>

              {/* The Spinning Wheel Canvas/Circle */}
              <div
                className="relative h-full w-full overflow-hidden rounded-full border-8 border-white bg-white shadow-2xl transition-transform ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transitionDuration: isSpinning ? "4000ms" : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.15, 0.9, 0.2, 1)",
                }}
              >
                {/* SVG Slices */}
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {prizes.map((p, idx) => {
                    const angle = 360 / prizes.length;
                    const startAngle = idx * angle;
                    const endAngle = (idx + 1) * angle;
                    const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                    const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                    const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                    const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

                    const colors = ["#b86b45", "#f4ede2", "#35261d", "#d6c4ad", "#e8dccb", "#964e2d"];
                    const textColors = ["#ffffff", "#231812", "#ffffff", "#231812", "#231812", "#ffffff"];

                    return (
                      <g key={p.label}>
                        <path
                          d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                          fill={colors[idx % colors.length]}
                          stroke="#ffffff"
                          strokeWidth="0.8"
                        />
                        <text
                          x="50"
                          y="18"
                          transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                          fill={textColors[idx % textColors.length]}
                          fontSize="4"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {p.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Center Hub Logo */}
                <div className="absolute top-1/2 left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-espresso-900 text-lg shadow-lg">
                  ☕
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
