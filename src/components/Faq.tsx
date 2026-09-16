"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative bg-sand-50 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
            FAQ • Pertanyaan Umum
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-espresso-900 sm:text-4xl md:text-5xl">
            Sering Ditanyakan
          </h2>
        </div>

        <div className="mt-12 space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-xs transition-colors hover:border-sand-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors sm:p-6"
                >
                  <span className="font-[family-name:var(--font-display)] text-base font-bold text-espresso-900 sm:text-lg">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-100 text-sm font-bold text-terracotta transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-espresso-900 text-white" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-sand-100 px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
                    <p className="text-xs leading-relaxed text-espresso-700/80 sm:text-sm">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
