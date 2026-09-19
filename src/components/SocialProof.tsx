"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { faqs, reasons, testimonials } from "@/lib/data";
import { IconStar } from "./icons";

export default function SocialProof() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section id="why" className="border-t border-rule bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 xl:px-12">
          <p className="text-[9px] font-bold uppercase tracking-[.25em] text-accent">Kenapa kami</p>
          <div className="mt-3 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .3 }}
                transition={{ delay: index * .07 }}
                className="border-t-2 border-ink pt-5"
              >
                <span className="text-[10px] font-bold text-accent">0{index + 1}</span>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold">{reason.title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonial" className="bg-ink py-16 text-white sm:py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 xl:px-12">
          <div className="grid gap-5 lg:grid-cols-[1fr_300px] lg:items-end">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,5.5rem)] font-black leading-[.88] tracking-[-.05em]">
              Word on<br /><i className="font-normal text-[#b8aaa0]">the street.</i>
            </h2>
            <p className="max-w-sm text-xs leading-6 text-white/55 sm:text-sm">
              Kata mereka yang tiap sore duduk di sini — mahasiswa nugas, pekerja WFC, dan penikmat kopi sejati.
            </p>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ delay: index * .08 }}
                className="flex flex-col border border-white/20 p-6 sm:p-7"
              >
                <div className="flex gap-1 text-accent" aria-label={`Rating ${t.rating} dari 5`}>
                  {Array.from({ length: t.rating }).map((_, star) => <IconStar key={star} className="h-3.5 w-3.5" />)}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-7 text-white/85">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/15 pt-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center bg-accent text-sm font-bold">{t.initial}</span>
                  <span className="text-xs leading-4">
                    <b className="block font-semibold">{t.name}</b>
                    <span className="text-white/50">{t.role} · {t.tag}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-paper py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] xl:px-12">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[.25em] text-accent">FAQ</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,5.5rem)] font-black leading-[.88] tracking-[-.05em]">
              Sering<br /><i className="font-normal text-accent">ditanyakan.</i>
            </h2>
          </div>
          <div>
            {faqs.map((faq, index) => (
              <div key={faq.q} className="border-t border-rule last:border-b">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-[family-name:var(--font-display)] text-base font-bold sm:text-lg">{faq.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center border border-ink text-sm" aria-hidden="true">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                {openFaq === index && <p className="max-w-2xl pb-5 text-sm leading-7 text-muted">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
