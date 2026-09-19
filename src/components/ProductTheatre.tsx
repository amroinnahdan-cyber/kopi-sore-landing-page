"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { menuItems } from "@/lib/data";
import { IconChevron, IconCup, IconDiamond, IconIce, IconStar } from "./icons";
import { useCart } from "./CartProvider";

export default function ProductTheatre() {
  const [active, setActive] = useState(0);
  const [sweetness, setSweetness] = useState<"Normal" | "Less Sweet" | "No Sugar">("Normal");
  const [temperature, setTemperature] = useState<"Iced" | "Hot">("Iced");
  const { addItem } = useCart();
  const item = menuItems[active];
  const move = (direction: number) => setActive((active + direction + menuItems.length) % menuItems.length);

  const addToBag = () => addItem({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    sweetness,
    temperature,
  });

  return (
    <section id="menu" className="bg-paper py-16 sm:py-24 xl:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 xl:px-12">
        <div className="flex items-end justify-between border-b border-rule pb-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[.24em] text-accent">Menu / freshly made</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,6rem)] font-black leading-none tracking-[-.055em]">What are you having?</h2>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button onClick={() => move(-1)} className="grid h-11 w-11 place-items-center border border-ink/30 hover:bg-ink hover:text-white">←</button>
            <span className="min-w-12 text-center text-xs">{String(active + 1).padStart(2,"0")} / {String(menuItems.length).padStart(2,"0")}</span>
            <button onClick={() => move(1)} className="grid h-11 w-11 place-items-center bg-ink text-white hover:bg-accent">→</button>
          </div>
        </div>

        {/* On laptop the selector sits above; only wide screens use a side rail. */}
        <div className="mt-6 flex gap-1 overflow-x-auto border-b border-rule pb-3 no-scrollbar xl:hidden">
          {menuItems.map((menu, index) => (
            <button key={menu.id} onClick={() => setActive(index)} className={`shrink-0 px-4 py-3 text-left transition-colors ${index === active ? "bg-ink text-white shadow-[inset_0_-3px_0_var(--color-accent)]" : "bg-canvas text-ink hover:bg-paper"}`}>
              <span className={`block text-[8px] uppercase tracking-widest ${index === active ? "text-tan" : "text-muted"}`}>{String(index + 1).padStart(2, "0")}</span>
              <span className="font-[family-name:var(--font-display)] text-sm font-bold">{menu.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 grid border border-rule bg-canvas md:grid-cols-[1.15fr_.85fr] xl:mt-8 xl:grid-cols-[260px_1.15fr_.85fr]">
          <aside className="hidden border-r border-rule xl:block">
            {menuItems.map((menu, index) => (
              <button key={menu.id} onClick={() => setActive(index)} className={`relative flex w-full items-center justify-between gap-3 border-b border-rule py-5 pl-6 pr-5 text-left transition-colors ${index === active ? "bg-ink text-white" : "hover:bg-paper"}`}>
                {index === active && <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-accent" />}
                <span><small className={`block text-[8px] uppercase tracking-widest ${index === active ? "text-tan" : "text-muted"}`}>{String(index + 1).padStart(2, "0")} · {menu.category}</small><strong className="mt-1 block font-[family-name:var(--font-display)] text-base">{menu.name}</strong></span>
                {index === active && <IconChevron className="h-3.5 w-3.5 shrink-0 text-tan" />}
              </button>
            ))}
          </aside>

          <div className="relative min-h-[430px] overflow-hidden sm:min-h-[540px] md:min-h-[620px] xl:min-h-[720px]">
            <AnimatePresence mode="wait">
              <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }} className="absolute inset-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 767px) 100vw, (max-width: 1279px) 58vw, 42vw" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
            {item.badge && <span className="absolute left-4 top-4 flex items-center gap-2 bg-ink px-3 py-2 text-[8px] font-bold uppercase tracking-widest text-canvas">{item.badge}<IconDiamond className="h-1.5 w-1.5 text-tan" /></span>}
            <motion.div key={`${item.id}-title`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-5 left-5 right-5 text-white sm:bottom-8 sm:left-8">
              <p className="text-[9px] uppercase tracking-[.2em] text-white/70">{item.tagline}</p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-4xl font-bold leading-none sm:text-6xl">{item.name}</h3>
            </motion.div>
          </div>

          <div className="flex flex-col justify-between border-t border-rule bg-paper p-5 sm:p-7 md:border-l md:border-t-0 lg:p-9">
            <AnimatePresence mode="wait">
              <motion.div key={`${item.id}-copy`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest"><span>{item.category}</span><span className="flex items-center gap-1.5 tabular-nums"><IconStar className="h-3 w-3 text-accent" />4.9</span></div>
                <p className="mt-7 text-sm leading-7 text-muted">{item.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{item.tastingNotes.map(note => <span key={note} className="border border-rule px-2.5 py-1.5 text-[9px]">{note}</span>)}</div>
                <div className="mt-7 space-y-4"><TasteMeter label="Sweetness" value={item.sweetness}/><TasteMeter label="Coffee intensity" value={item.intensity}/></div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 border-t border-rule pt-6">
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Make it yours</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(["Iced","Hot"] as const).map(value => <button key={value} onClick={() => setTemperature(value)} className={`flex min-h-11 items-center justify-center gap-2 border text-[10px] font-bold uppercase tracking-[.14em] transition-colors ${temperature === value ? "border-ink bg-ink text-white" : "border-rule text-muted hover:border-ink/40 hover:text-ink"}`}>{value === "Iced" ? <IconIce className="h-4 w-4" /> : <IconCup className="h-4 w-4" />}{value}</button>)}
              </div>
              <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">{(["Normal","Less Sweet","No Sugar"] as const).map(value => <button key={value} onClick={() => setSweetness(value)} className={`min-h-10 shrink-0 border px-3 text-[9px] font-bold ${sweetness === value ? "border-accent bg-accent text-white" : "border-rule"}`}>{value}</button>)}</div>
              <div className="mt-7 flex items-center justify-between gap-3">
                <div><small className="block text-[8px] uppercase tracking-widest text-muted">Price</small><strong className="font-[family-name:var(--font-display)] text-2xl">Rp{item.price.toLocaleString("id-ID")}</strong></div>
                <button onClick={addToBag} className="min-h-12 bg-ink px-5 text-[9px] font-bold uppercase tracking-widest text-white hover:bg-accent">Add to bag +</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
          <button onClick={() => move(-1)} className="min-h-12 border border-ink/30 text-xs">← Previous</button>
          <button onClick={() => move(1)} className="min-h-12 bg-ink text-xs text-white">Next →</button>
        </div>
      </div>
    </section>
  );
}

function TasteMeter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between text-[9px] font-bold uppercase tracking-[.18em]">
        <span className="text-muted">{label}</span>
        <span className="tabular-nums text-ink">{value}/5</span>
      </div>
      <div className="flex gap-[5px]" role="img" aria-label={`${label}: ${value} dari 5`}>
        {[1,2,3,4,5].map(number => <span key={number} className={`h-[3px] flex-1 ${number <= value ? "bg-accent" : "bg-tan/45"}`} />)}
      </div>
    </div>
  );
}
