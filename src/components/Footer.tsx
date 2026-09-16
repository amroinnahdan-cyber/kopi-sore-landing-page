import { business, navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-sand-300 bg-espresso-900 text-sand-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta text-lg text-white">
                ☕
              </div>
              <span className="font-[family-name:var(--font-display)] text-2xl font-black text-sand-50">
                Kopi Sore
              </span>
            </div>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-sand-200/70">
              Kedai kopi specialty dengan atmosfer warm-minimalist di Bekasi.
              Tempat terbaik untuk melepas penat, berdiskusi, dan fokus berkarya.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/30 bg-white/5 text-sm transition-colors hover:bg-terracotta hover:text-white"
                aria-label="Instagram Kopi Sore"
              >
                📸
              </a>
              <a
                href={`https://wa.me/${business.whatsappIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/30 bg-white/5 text-sm transition-colors hover:bg-terracotta hover:text-white"
                aria-label="WhatsApp Kopi Sore"
              >
                💬
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold tracking-widest text-terracotta uppercase">
              Navigasi Halaman
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sand-200/70 transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold tracking-widest text-terracotta uppercase">
              Informasi Kedai
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-sand-200/70">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>{business.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕗</span>
                <span>{business.hours}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <span>{business.whatsapp}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📷</span>
                <span>{business.instagram}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-sand-300/20 pt-8 text-center text-[11px] text-sand-300/50 sm:flex-row">
          <p>© 2026 Kopi Sore. All Rights Reserved.</p>
          <p>Dibuat untuk Tugas Front-End Landing Page • Warm Minimalist Edition ☕</p>
        </div>
      </div>
    </footer>
  );
}
