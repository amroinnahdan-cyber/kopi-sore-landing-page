import Image from "next/image";
import Reveal from "./Reveal";

const highlights = [
  {
    title: "100% Single Origin & House Blend",
    desc: "Biji kopi Nusantara pilihan disangrai secara berkala agar aroma & rasa selalu optimal.",
  },
  {
    title: "Warm Minimalist Travertine Space",
    desc: "Konsep interior estetik dengan pencahayaan hangat, colokan di setiap meja & AC sejuk.",
  },
  {
    title: "Harga Bersahabat Pelajar & Mahasiswa",
    desc: "Menu berkualitas artisan mulai Rp18.000 tanpa mengorbankan kualitas rasa.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-sand-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Real Cafe Interior Image */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative mx-auto w-full max-w-lg">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2.5rem] border border-sand-200/90 bg-white p-3 shadow-xl sm:p-4">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-sand-200">
                    <Image
                      src="https://images.pexels.com/photos/9073781/pexels-photo-9073781.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      alt="Suasana interior minimalis Kopi Sore yang hangat dan nyaman"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 550px"
                    />
                  </div>
                </div>

                {/* Since 2021 Floating Card */}
                <div className="absolute -bottom-6 -right-4 rounded-2xl border border-sand-300 bg-espresso-900 p-5 text-sand-50 shadow-2xl sm:-bottom-8 sm:-right-6 sm:p-6">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-black text-sand-100 sm:text-4xl">
                    2021
                  </p>
                  <p className="text-[11px] font-bold tracking-wider uppercase text-terracotta">
                    Tumbuh Bersama Komunitas
                  </p>
                  <p className="mt-1 text-[11px] text-sand-200/70">
                    Menemani 50.000+ cangkir kopi di Bekasi
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Storytelling text */}
          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
                Tentang Kopi Sore
              </span>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-espresso-900 sm:text-4xl md:text-5xl">
                Tempat Singgah yang Hangat di Setiap Sore
              </h2>
              <p className="mt-4 text-xs leading-relaxed text-espresso-700/80 sm:text-sm">
                <strong>Kopi Sore</strong> lahir dari kecintaan kami pada aroma kopi yang jujur
                dan ruang kumpul yang menenangkan. Kami merancang tempat ini untuk kamu —
                pelajar yang butuh fokus nugas, mahasiswa yang berdiskusi, hingga pekerja muda
                yang membutuhkan atmosfer WFC tanpa distraksi.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-espresso-700/80 sm:text-sm">
                Dengan nuansa warm-beige, tekstur alami, dan musik akustik lo-fi, Kopi Sore
                hadir menjadi rumah kedua bagi siapa saja yang ingin bersantai dan recharge energi.
              </p>

              {/* Highlights List */}
              <div className="mt-6 space-y-3.5">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl border border-sand-200 bg-white/70 p-3.5 transition-colors hover:border-terracotta/40"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-espresso-900 sm:text-sm">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-espresso-700/70">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
