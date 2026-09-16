"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { business } from "@/lib/data";

const details = [
  ["01", "Roasted weekly", "Biji pilihan Nusantara disangrai berkala agar rasanya tetap hidup."],
  ["02", "Made for staying", "Wi-Fi cepat, colokan di setiap meja, dan kursi yang benar-benar nyaman."],
  ["03", "Friendly by design", "Kualitas specialty dengan harga yang tetap masuk akal untuk dinikmati setiap hari."],
];

export default function EditorialExperience() {
  const reservation = `https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent("Halo Kopi Sore, saya ingin reservasi meja untuk hari ini ☕")}`;

  return (
    <>
      <div className="overflow-hidden border-y border-ink bg-accent py-3.5 text-white">
        <div className="ticker flex w-max gap-9 whitespace-nowrap text-[9px] font-bold uppercase tracking-[.23em]">
          {Array.from({ length: 4 }).flatMap((_, group) => ["Specialty coffee", "Golden-hour seats", "Wi-Fi 100 Mbps", "Open every day", "Coffee from Rp18k"].map((text, item) => <span key={`${group}-${item}`} className="flex gap-9">{text}<b>✦</b></span>))}
        </div>
      </div>

      <section id="experience" className="bg-ink py-16 text-white sm:py-24 xl:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 xl:px-12">
          <p className="text-[9px] font-bold uppercase tracking-[.25em] text-white/50">The space / Bekasi</p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_300px] lg:items-end">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3.2rem,8vw,8rem)] font-black leading-[.86] tracking-[-.065em]">Come for coffee.<br/><i className="font-normal text-[#b8aaa0]">Stay for a while.</i></h2>
            <p className="max-w-sm text-xs leading-6 text-white/55 sm:text-sm">Interior yang nyata, sederhana, dan hangat—bukan set buatan. Pilih sudut dekat jendela untuk cahaya sore atau meja tenang untuk menyelesaikan pekerjaan.</p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_.6fr]">
            <motion.figure initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} className="relative min-h-[480px] overflow-hidden sm:min-h-[620px] xl:min-h-[760px]">
              <Image src="https://images.pexels.com/photos/9073781/pexels-photo-9073781.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1500" alt="Sudut dekat jendela Kopi Sore" fill className="object-cover" sizes="(max-width: 767px) 100vw, 65vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-24 sm:p-8 sm:pt-28"><figcaption className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl">Window seats,<br/>best after four.</figcaption></div>
            </motion.figure>
            <div className="grid grid-rows-[1fr_auto] gap-3">
              <motion.figure initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative min-h-[360px] overflow-hidden sm:min-h-[440px] xl:min-h-0">
                <Image src="https://images.pexels.com/photos/7401894/pexels-photo-7401894.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=800" alt="Area kerja Kopi Sore" fill className="object-cover" sizes="(max-width: 767px) 100vw, 40vw" />
                <span className="absolute left-4 top-4 bg-paper px-3 py-2 text-[8px] font-bold uppercase tracking-widest text-ink">Quiet work corner</span>
              </motion.figure>
              <div className="border border-white/20 p-5 sm:p-7">
                <div className="grid grid-cols-2 gap-x-5 gap-y-4 text-[9px] uppercase tracking-wider text-white/55"><span>Wi-Fi <b className="mt-1 block text-sm normal-case text-white">100 Mbps</b></span><span>Outlets <b className="mt-1 block text-sm normal-case text-white">Every table</b></span><span>Music <b className="mt-1 block text-sm normal-case text-white">Lo-fi & jazz</b></span><span>Hours <b className="mt-1 block text-sm normal-case text-white">08—22 daily</b></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-paper py-16 sm:py-24 xl:py-32">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] xl:px-12">
          <div><p className="text-[9px] font-bold uppercase tracking-[.25em] text-accent">Why Kopi Sore</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,7rem)] font-black leading-[.88] tracking-[-.06em]">Coffee,<br/>without the<br/><i className="font-normal text-accent">pretension.</i></h2></div>
          <div className="self-end">{details.map(([number,title,copy]) => <div key={number} className="grid grid-cols-[38px_1fr] gap-3 border-t border-rule py-5 sm:grid-cols-[55px_1fr] sm:py-7"><span className="text-[10px] font-bold text-accent">{number}</span><div><h3 className="font-[family-name:var(--font-display)] text-xl font-bold sm:text-2xl">{title}</h3><p className="mt-1 max-w-lg text-xs leading-6 text-muted sm:text-sm">{copy}</p></div></div>)}</div>
        </div>
      </section>

      <section id="contact" className="relative min-h-[78svh] overflow-hidden text-white sm:min-h-[85svh]">
        <Image src="https://images.pexels.com/photos/37421582/pexels-photo-37421582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1300&w=1900" alt="Kunjungi Kopi Sore" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex min-h-[78svh] max-w-[1500px] flex-col justify-between px-5 py-7 sm:min-h-[85svh] sm:px-8 sm:py-10 xl:px-12">
          <div className="flex justify-between text-[8px] font-bold uppercase tracking-[.22em]"><span>Come over</span><span>Bekasi · Indonesia</span></div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3.8rem,12vw,11rem)] font-black leading-[.78] tracking-[-.07em]">SEE YOU<br/><span className="outline-light">THIS SORE.</span></h2>
            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href={reservation} target="_blank" rel="noreferrer" className="bg-accent px-6 py-4 text-[9px] font-bold uppercase tracking-[.18em] hover:bg-white hover:text-ink">Reserve on WhatsApp ↗</a><p className="text-[10px] leading-5 text-white/70">{business.address}<br/>{business.hours}</p></div>
          </div>
          <div className="flex flex-col gap-2 border-t border-white/25 pt-4 text-[8px] uppercase tracking-[.18em] text-white/60 sm:flex-row sm:justify-between"><span>© 2026 Kopi Sore</span><span>{business.instagram} · {business.whatsapp}</span></div>
        </div>
      </section>
    </>
  );
}
