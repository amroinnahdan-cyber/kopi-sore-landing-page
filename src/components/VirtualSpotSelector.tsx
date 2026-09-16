"use client";

import Image from "next/image";
import { useState } from "react";
import { sound } from "@/lib/audio";
import { business } from "@/lib/data";

const spots = [
  {
    id: "window",
    name: "Spot Jendela Golden Hour",
    tagline: "Cahaya Alami Sore & Suasana Santai",
    desc: "Meja di dekat jendela kaca besar dengan pencahayaan sore hangat yang estetik. Pilihan nomor satu untuk foto OOTD dan menikmati kopi sambil melihat jalanan sore.",
    image: "https://images.pexels.com/photos/9073781/pexels-photo-9073781.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    amenities: ["Cahaya Golden Hour ✨", "Meja Kayu Estetik", "AC Sejuk", "Wi-Fi 100 Mbps"],
    suitableFor: "Nongkrong Santai, Foto Estetik & Ngobrol",
  },
  {
    id: "wfc",
    name: "Meja Khusus WFC & Nugas",
    tagline: "Fokus Kerja Tanpa Gangguan",
    desc: "Dilengkapi colokan listrik ganda di setiap kursi, kursi ergonomis berlapis bantal, dan jarak meja yang luas agar kamu nyaman meeting online atau ngerjain skripsi.",
    image: "https://images.pexels.com/photos/7401894/pexels-photo-7401894.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    amenities: ["Colokan di Tiap Kursi 🔌", "Kursi Bantal Nyaman", "Wi-Fi High-Speed", "Playlist Lo-Fi Tenang"],
    suitableFor: "Laptopan, Skripsi, Remote Work & Tugas Kampus",
  },
  {
    id: "bar",
    name: "Slow Bar & Barista Counter",
    tagline: "Interaksi Langsung dengan Barista",
    desc: "Duduk dekat mesin espresso La Marzocco dan slow bar pour-over. Kamu bisa ngobrol santai seputar beans kopi, manual brew V60, dan mencium aroma biji kopi yang baru digiling.",
    image: "https://images.pexels.com/photos/38617194/pexels-photo-38617194.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    amenities: ["Aroma Kopi Segar ☕", "Tanya Rekomendasi Beans", "Akses Manual Brew", "Live Brewing View"],
    suitableFor: "Pecinta Kopi Specialty & Me-time",
  },
  {
    id: "lounge",
    name: "Cozy Bench & Sofa Lounge",
    tagline: "Rileks Bareng Teman Satu Geng",
    desc: "Bangku sofa memanjang dengan bantal linen empuk dan karpet rami yang nyaman untuk nongkrong rame-rame setelah pulang kantor atau kuliah.",
    image: "https://images.pexels.com/photos/37421582/pexels-photo-37421582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    amenities: ["Bantal Linen Lembut 🛋️", "Kapasitas 4-6 Orang", "Meja Rendah Cozy", "Suasana Hangat"],
    suitableFor: "Kumpul Komunitas, Reuni Kecil & Diskusi Kelompok",
  },
];

export default function VirtualSpotSelector() {
  const [activeSpot, setActiveSpot] = useState(spots[0]);

  const handleSelectSpot = (s: typeof spots[0]) => {
    sound.playClick();
    setActiveSpot(s);
  };

  const bookingWALink = `https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent(
    `Halo Kopi Sore! Saya ingin reservasi/tanya ketersediaan spot: ${activeSpot.name} untuk hari ini ☕`
  )}`;

  return (
    <section className="relative overflow-hidden bg-sand-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
            Virtual Tour Kedai
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-espresso-900 sm:text-4xl md:text-5xl">
            Pilih Spot Nongkrong Favoritmu
          </h2>
          <p className="mt-3 text-xs text-espresso-700/80 sm:text-sm">
            Setiap sudut Kopi Sore dirancang dengan fungsi &amp; suasana berbeda. Pilih spot yang
            paling pas untuk aktivitasmu sore ini.
          </p>
        </div>

        {/* Spot Navigation Tabs */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 no-scrollbar sm:justify-center">
          {spots.map((s) => {
            const isSelected = activeSpot.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectSpot(s)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-espresso-900 text-sand-50 shadow-md ring-2 ring-terracotta/30"
                    : "border border-sand-300 bg-white text-espresso-800 hover:bg-sand-100"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>

        {/* Spot Showcase Card */}
        <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-sand-200 bg-white p-6 shadow-xl md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
            {/* Image */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-sand-100 shadow-inner md:col-span-6">
              <Image
                key={activeSpot.image}
                src={activeSpot.image}
                alt={activeSpot.name}
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute top-4 left-4 rounded-full bg-espresso-900/90 px-3.5 py-1 text-xs font-bold text-sand-50 backdrop-blur-xs">
                {activeSpot.name}
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta">
                Spot Rekomendasi
              </span>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-espresso-900 sm:text-3xl">
                {activeSpot.tagline}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-espresso-700/80 sm:text-sm">
                {activeSpot.desc}
              </p>

              {/* Amenities Grid */}
              <div className="mt-6">
                <p className="text-[11px] font-bold tracking-wider uppercase text-espresso-900">
                  Fasilitas di Spot Ini:
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {activeSpot.amenities.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-2 rounded-xl border border-sand-200 bg-sand-50 p-2 text-xs font-semibold text-espresso-800"
                    >
                      <span className="text-terracotta">✓</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable info */}
              <div className="mt-5 rounded-2xl bg-sand-100/70 p-3.5 text-xs">
                <span className="font-bold text-espresso-900">Cocok Untuk: </span>
                <span className="text-espresso-700/80">{activeSpot.suitableFor}</span>
              </div>

              {/* Booking CTA */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={bookingWALink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-espresso-900 px-7 py-3 text-xs font-bold tracking-wider uppercase text-sand-50 shadow-md transition-all hover:bg-terracotta active:scale-95"
                >
                  <span>💬 Reservasi Spot Ini via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
