"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/data";
import { IconCup } from "./icons";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent("Halo Kopi Sore, saya mau tanya-tanya dulu ☕")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat barista Kopi Sore di WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-ink px-4 py-3.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-accent ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <IconCup className="h-4 w-4" />
      <span className="hidden sm:inline">Chat barista</span>
    </a>
  );
}
