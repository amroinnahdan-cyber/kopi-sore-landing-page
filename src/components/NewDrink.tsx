"use client";

import Image from "next/image";
import { business } from "@/lib/data";
import { useCart } from "./CartProvider";

export default function NewDrink() {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: "iced-latte",
      name: "Iced Latte (New)",
      price: 25000,
      image: "/images/new-drink.jpg",
    });
  };

  const waLink = `https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent(
    "Halo Kopi Sore, saya mau pesan New Iced Latte ☕"
  )}`;

  return (
    <section className="relative overflow-hidden bg-blush py-20 md:py-28">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-terracotta/20 blur-3xl" />
      <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-sand/30 blur-2xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:px-8">
        <div>
          <p className="flex items-baseline gap-3 font-[family-name:var(--font-playfair)] text-5xl font-black text-espresso md:text-7xl">
            New
            <span className="font-[family-name:var(--font-dancing)] text-3xl font-normal text-terracotta md:text-4xl">
              addition
            </span>
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-playfair)] text-5xl font-black text-espresso md:text-6xl">
            drink
          </h3>

          <div className="mt-6">
            <h4 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-espresso">
              Iced Latte
            </h4>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-espresso/70">
              Minuman kopi segar dengan espresso, susu dingin, dan es. Teksturnya
              smooth & light, rasa pahit dan creamy yang seimbang.
            </p>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-[family-name:var(--font-playfair)] text-4xl font-black text-espresso">
              Rp25.000
            </span>
            <span className="text-lg text-espresso/40 line-through">
              Rp32.000
            </span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-espresso/10 pt-6 text-center">
            <Feat value="3" label="Syrups" sub="vanilla, caramel, hazelnut" />
            <Feat value="W/" label="" sub="espresso + cold milk + ice" />
            <Feat value="20%" label="off" sub="launch discount" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleAdd}
              className="rounded-full bg-espresso px-7 py-3.5 font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-mocha"
            >
              Add to Cart
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-espresso px-7 py-3.5 font-semibold text-espresso transition-all hover:-translate-y-0.5 hover:bg-espresso hover:text-cream"
            >
              Order via WA
            </a>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="animate-floaty relative h-[380px] w-[280px] md:h-[480px] md:w-[360px]">
            <Image
              src="/images/new-drink.jpg"
              alt="New Iced Latte with coconut"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 70vw, 360px"
            />
          </div>
          <div className="absolute -top-4 right-4 grid h-20 w-20 place-items-center rounded-full bg-terracotta font-[family-name:var(--font-playfair)] text-center font-bold text-white md:h-24 md:w-24">
            <div className="text-[10px] font-normal uppercase tracking-widest opacity-80">
              Launch
            </div>
            <div className="text-2xl md:text-3xl">20%</div>
            <div className="text-[10px] font-normal uppercase tracking-widest opacity-80">
              Off
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div>
      <p className="font-[family-name:var(--font-playfair)] text-2xl font-black text-espresso">
        {value} {label && <span className="text-terracotta">{label}</span>}
      </p>
      <p className="mt-1 text-[11px] leading-tight text-espresso/60">{sub}</p>
    </div>
  );
}
