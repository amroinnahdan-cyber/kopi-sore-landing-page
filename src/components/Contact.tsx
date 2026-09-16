"use client";

import { useState } from "react";
import { business } from "@/lib/data";
import Reveal from "./Reveal";

const contactDetails = [
  {
    icon: "📍",
    label: "Alamat Kami",
    value: business.address,
    desc: "Dekat Stasiun Bekasi & Summarecon Mall",
  },
  {
    icon: "💬",
    label: "WhatsApp Resmi",
    value: business.whatsapp,
    href: `https://wa.me/${business.whatsappIntl}`,
    desc: "Respon cepat 08.00 - 22.00 WIB",
  },
  {
    icon: "📸",
    label: "Instagram",
    value: business.instagram,
    href: business.instagramUrl,
    desc: "Update promo harian & konten estetik",
  },
  {
    icon: "🕗",
    label: "Jam Operasional",
    value: business.hours,
    desc: "Buka setiap hari termasuk hari libur",
  },
];

export default function Contact() {
  const [formName, setFormName] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formTopic, setFormTopic] = useState("Tanya Menu");

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMsg) return;
    const text = `*Halo Kopi Sore!*%0A*Nama:* ${formName}%0A*Topik:* ${formTopic}%0A*Pesan:* ${formMsg}`;
    window.open(`https://wa.me/${business.whatsappIntl}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="relative bg-sand-100/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
            Kontak &amp; Lokasi
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-espresso-900 sm:text-4xl md:text-5xl">
            Kunjungi Kedai Kopi Sore
          </h2>
          <p className="mt-3 text-xs text-espresso-700/80 sm:text-sm">
            Mampir langsung atau hubungi kami lewat WhatsApp untuk reservasi meja dan pemesanan.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((item) => {
            const content = (
              <div className="h-full rounded-3xl border border-sand-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand-100 text-2xl">
                  {item.icon}
                </div>
                <p className="mt-4 text-[11px] font-bold tracking-wider text-terracotta uppercase">
                  {item.label}
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-base font-bold text-espresso-900">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-espresso-700/70">{item.desc}</p>
              </div>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        {/* Maps & Direct Message Form */}
        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-12">
          {/* Google Maps iframe */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="h-full min-h-[380px] overflow-hidden rounded-3xl border border-sand-200 bg-white p-2 shadow-md">
                <iframe
                  title="Lokasi Kopi Sore di Bekasi"
                  src="https://www.google.com/maps?q=Jl.+Sudirman+Bekasi&output=embed"
                  className="h-full min-h-[360px] w-full rounded-2xl border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Interactive Fast Form */}
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-md sm:p-8">
                <span className="text-[11px] font-bold tracking-widest text-terracotta uppercase">
                  Kirim Pesan Cepat
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-espresso-900">
                  Ada Pertanyaan atau Saran?
                </h3>

                <form onSubmit={handleSendWA} className="mt-5 space-y-3.5">
                  <div>
                    <label className="text-[11px] font-bold tracking-wider uppercase text-espresso-800">
                      Nama Kamu:
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="mt-1.5 w-full rounded-xl border border-sand-300 bg-sand-50 px-3.5 py-2.5 text-xs text-espresso-900 outline-hidden transition-colors focus:border-terracotta focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold tracking-wider uppercase text-espresso-800">
                      Topik:
                    </label>
                    <select
                      value={formTopic}
                      onChange={(e) => setFormTopic(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-sand-300 bg-sand-50 px-3.5 py-2.5 text-xs text-espresso-900 outline-hidden focus:border-terracotta"
                    >
                      <option value="Tanya Menu & Harga">Tanya Menu &amp; Harga</option>
                      <option value="Reservasi Meja / Event">Reservasi Meja / Event</option>
                      <option value="Pemesanan Catering / Kantor">Pemesanan Catering</option>
                      <option value="Kritik & Saran">Kritik &amp; Saran</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold tracking-wider uppercase text-espresso-800">
                      Pesan Kamu:
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Tuliskan pertanyaan atau pesanan kamu..."
                      className="mt-1.5 w-full rounded-xl border border-sand-300 bg-sand-50 px-3.5 py-2.5 text-xs text-espresso-900 outline-hidden transition-colors focus:border-terracotta focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso-900 py-3 text-xs font-bold tracking-wider uppercase text-sand-50 transition-all hover:bg-terracotta"
                  >
                    <span>💬</span> Kirim via WhatsApp
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
