"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/data";

export default function FloatingWhatsApp() {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const waLink = `https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent(
    "Halo Barista Kopi Sore! Mau tanya menu atau pesan sekarang ☕"
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Popover Bubble */}
      {showBubble && (
        <div className="relative hidden animate-fade-up rounded-2xl border border-sand-300 bg-sand-50 p-3.5 shadow-xl sm:block">
          <button
            onClick={() => setShowBubble(false)}
            className="absolute -top-1.5 -left-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-sand-300 text-[10px] text-espresso-900"
          >
            ✕
          </button>
          <p className="text-xs font-bold text-espresso-900">Mau ngopi apa sore ini?</p>
          <p className="text-[10px] text-espresso-700/70">Chat Barista kami via WhatsApp 👋</p>
        </div>
      )}

      {/* Floating Button with Pulse Effect */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Kopi Sore"
        className="wa-pulse flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
      >
        💬
      </a>
    </div>
  );
}
