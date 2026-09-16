import { reasons } from "@/lib/data";
import Reveal from "./Reveal";

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative bg-sand-100/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
            Keunggulan Kami
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-espresso-900 sm:text-4xl md:text-5xl">
            Kenapa Memilih Kopi Sore?
          </h2>
          <p className="mt-3 text-xs text-espresso-700/80 sm:text-sm">
            Kualitas rasa, suasana nyaman, dan pelayanan ramah adalah standar yang selalu kami jaga.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 100}>
              <div className="group flex h-full flex-col justify-between rounded-3xl border border-sand-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-terracotta/40 hover:shadow-xl sm:p-7">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-100 text-2xl transition-all group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold text-espresso-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-espresso-700/80">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-sand-200/80 pt-4 text-[11px] font-bold text-terracotta group-hover:text-espresso-900">
                  Pelajari Lebih Lanjut →
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
