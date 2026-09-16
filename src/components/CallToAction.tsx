import { business } from "@/lib/data";

export default function CallToAction() {
  const waLink = `https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent(
    "Halo Kopi Sore! Saya ingin pesan kopi atau tanya meja untuk nanti sore ☕"
  )}`;

  return (
    <section className="relative bg-sand-100/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-espresso-900 p-8 text-center text-sand-50 shadow-2xl sm:p-14 lg:p-20">
          {/* Subtle warm glow inside */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-terracotta/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sand-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <span className="text-4xl sm:text-5xl">☕</span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Butuh Tempat Nyaman untuk Menikmati Kopi?
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-sand-200/80 sm:text-base">
              Datang ke Kopi Sore dan nikmati kopi favoritmu hari ini. Diseduh segar
              dengan kehangatan barista kami.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="#menu"
                className="rounded-full bg-terracotta px-8 py-3.5 text-xs font-bold tracking-wider uppercase text-white shadow-lg transition-all hover:bg-terracotta-dark active:scale-95"
              >
                Lihat Menu Sekarang
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-sand-300/40 bg-sand-100/10 px-7 py-3.5 text-xs font-bold tracking-wider uppercase text-sand-100 backdrop-blur-xs transition-all hover:bg-white hover:text-espresso-900 active:scale-95"
              >
                <span>💬</span> Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
