# ☕ Kopi Sore — Landing Page

Landing page untuk kedai kopi **Kopi Sore** di Bekasi: menu theatre interaktif, reservasi & pemesanan langsung via WhatsApp (tanpa backend), dan desain editorial gelap yang hangat.

**Live:** [kopi-sore-landing-page.vercel.app](https://kopi-sore-landing-page.vercel.app)

## Fitur

- **Hero editorial** dengan tipografi Playfair Display besar + parallax halus (direspect `prefers-reduced-motion`)
- **Menu theatre** — carousel minuman dengan meter rasa (sweetness/intensity), pilihan suhu & level gula **per menu**
- **Keranjang belanja** tanpa backend:
  - Varian disimpan terpisah (minuman sama + varian beda = baris beda)
  - Catatan custom per item (mis. *"pakai oat milk"*)
  - Persist ke `localStorage` dengan validasi bentuk data
  - Dialog yang aksesibel: `role="dialog"`, Escape, focus trap, scroll lock, `inert` saat tertutup
  - Checkout terkirim sebagai pesan WhatsApp terformat (di-encode dengan `encodeURIComponent`)
- **Section lengkap**: Experience (galeri interior), About, Kenapa Kami, Testimonial, FAQ accordion, Contact
- **SEO**: OpenGraph/Twitter metadata, JSON-LD `CafeOrCoffeeShop` (alamat, jam buka, harga, menu), `sitemap.xml`, `robots.txt`, favicon SVG
- **Aksesibilitas**: kontras teks kecil ≥ 4.5:1, tap target ≥ 44px di mobile, label semua kontrol ikon, focus indicator `:focus-visible`

## Stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) + React 19 |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) (CSS-first `@theme`) |
| Animasi | [Motion](https://motion.dev) (`motion/react`) |
| Font | Self-hosted via `next/font/local` — Playfair Display (variable) & Poppins, subset latin (~132KB). Build **tidak butuh internet** |
| Bahasa | TypeScript (strict) |

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Perintah lain:

```bash
npm run build      # build produksi (offline-friendly, font lokal)
npm run start      # jalankan hasil build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

> Catatan: `.env.local` berisi `DATABASE_URL` placeholder — hanya dipakai route `/api/health` bawaan template, tidak dipakai UI. Ganti kalau menyambungkan database sungguhan.

## Deploy

Situs ini deploy ke **Vercel** dan terhubung ke repo GitHub ini — **setiap push ke `master` otomatis deploy produksi**, branch lain menghasilkan preview URL.

Deploy manual via CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # produksi
```

Pastikan env `DATABASE_URL` tersedia untuk semua environment (Production/Preview/Development) agar build di cloud tidak gagal.

## Struktur folder

```
src/
├── app/
│   ├── layout.tsx            # Font lokal + metadata SEO + JSON-LD provider
│   ├── page.tsx              # Komposisi halaman utama
│   ├── globals.css           # Token warna (canvas/paper/ink/accent), ticker, focus style
│   ├── icon.svg              # Favicon
│   ├── fonts/                # woff2 Playfair + Poppins (subset latin)
│   ├── robots.ts             # Route robots.txt
│   ├── sitemap.ts            # Route sitemap.xml
│   └── api/health/route.ts   # Health check bawaan template (tidak dipakai UI)
├── components/
│   ├── CinematicHero.tsx     # Hero + foto (crop espresso bar) + blok mobile
│   ├── Navbar.tsx            # Navigasi terpisah dari hero
│   ├── ProductTheatre.tsx    # Carousel menu + opsi per item
│   ├── EditorialExperience.tsx # Ticker, galeri, about, contact
│   ├── SocialProof.tsx       # Kenapa kami, testimonial, FAQ
│   ├── CartProvider.tsx      # State keranjang + persist + logika varian
│   ├── CartDrawer.tsx        # Drawer keranjang (dialog aksesibel) + pesan WA
│   ├── FloatingWhatsApp.tsx  # Tombol chat melayang
│   ├── LocalBusinessJsonLd.tsx # Structured data CafeOrCoffeeShop
│   └── icons.tsx             # Ikon SVG inline (stroke 1.5px, currentColor)
└── lib/
    └── data.ts               # Data bisnis, menu, testimonial, FAQ
```

## Laporan bug & kontribusi

Kedai ini fiktif untuk keperluan demo. Buka *issue* atau *pull request* jika menemukan bug.
