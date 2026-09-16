"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);

  const current = testimonials[activeIndex];

  return (
    <section id="testimonial" className="relative overflow-hidden bg-sand-50 py-20 md:py-28">
      {/* Organic backdrop wave */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-96 w-full -translate-x-1/2 rounded-full bg-sand-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
            Ulasan Pelanggan
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-espresso-900 sm:text-4xl md:text-5xl">
            Cerita Hangat dari Mereka
          </h2>
        </div>

        {/* Testimonial Card Slider */}
        <div className="mt-12">
          <div className="relative mx-auto max-w-3xl rounded-[2.5rem] border border-sand-200 bg-white p-8 shadow-xl sm:p-12">
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 text-lg">
              {Array.from({ length: current.rating }).map((_, i) => (
                <span key={i} className="text-amber-500">
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mt-6 text-center font-[family-name:var(--font-display)] text-lg font-medium leading-relaxed text-espresso-900 sm:text-2xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand-200 font-[family-name:var(--font-display)] text-lg font-black text-espresso-900">
                {current.initial}
              </div>
              <p className="mt-2 font-[family-name:var(--font-display)] text-base font-bold text-espresso-900">
                {current.name}
              </p>
              <p className="text-xs text-espresso-700/70">{current.role}</p>
              <span className="mt-1 rounded-full bg-sand-100 px-3 py-0.5 text-[10px] font-bold text-terracotta">
                {current.tag}
              </span>
            </div>
          </div>

          {/* Navigation Dots & Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + total) % total)}
              aria-label="Testimonial sebelumnya"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 bg-sand-100 text-espresso-900 transition-colors hover:bg-espresso-900 hover:text-sand-50"
            >
              ←
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Pilih testimoni ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === activeIndex ? "w-8 bg-terracotta" : "w-2.5 bg-sand-300 hover:bg-sand-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % total)}
              aria-label="Testimonial berikutnya"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 bg-sand-100 text-espresso-900 transition-colors hover:bg-espresso-900 hover:text-sand-50"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
