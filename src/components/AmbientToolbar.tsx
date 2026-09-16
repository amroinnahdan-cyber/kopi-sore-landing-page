"use client";

import { useEffect, useState } from "react";
import { sound } from "@/lib/audio";

export default function AmbientToolbar() {
  const [isAmbientOn, setIsAmbientOn] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    sound.setMuted(isSoundMuted);
  }, [isSoundMuted]);

  const handleToggleAmbient = () => {
    const newState = sound.toggleAmbientCafe();
    setIsAmbientOn(newState);
  };

  const handleToggleMute = () => {
    setIsSoundMuted((prev) => !prev);
  };

  const handleToggleTheme = () => {
    setIsNightMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        document.body.style.backgroundColor = "#1d140e";
        document.body.style.color = "#f4ede2";
      } else {
        document.documentElement.classList.remove("dark");
        document.body.style.backgroundColor = "var(--sand-50)";
        document.body.style.color = "var(--espresso-900)";
      }
      return next;
    });
    sound.playClick();
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden items-center gap-2 rounded-full border border-sand-300/80 bg-sand-50/90 p-1.5 shadow-xl backdrop-blur-md transition-all hover:bg-white sm:flex">
      {/* Ambient Lo-Fi Cafe Sound Generator */}
      <button
        onClick={handleToggleAmbient}
        className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold transition-all ${
          isAmbientOn
            ? "bg-terracotta text-white shadow-sm"
            : "text-espresso-800 hover:bg-sand-200"
        }`}
        title="Putar Suara Suasana Kedai Kopi (Cafe Rain & Vinyl Crackle)"
      >
        <span>{isAmbientOn ? "☕ Cafe Audio: ON" : "🎧 Cafe Audio"}</span>
        {isAmbientOn && (
          <div className="flex items-center gap-0.5">
            <span className="h-2 w-0.5 animate-pulse bg-white" />
            <span className="h-3.5 w-0.5 animate-pulse bg-white" style={{ animationDelay: "0.2s" }} />
            <span className="h-1.5 w-0.5 animate-pulse bg-white" style={{ animationDelay: "0.4s" }} />
          </div>
        )}
      </button>

      <div className="h-4 w-px bg-sand-300" />

      {/* SFX Mute/Unmute */}
      <button
        onClick={handleToggleMute}
        className="flex h-8 w-8 items-center justify-center rounded-full text-espresso-800 transition-colors hover:bg-sand-200"
        title={isSoundMuted ? "Bunyikan Efek Suara" : "Bisukan Efek Suara"}
      >
        {isSoundMuted ? "🔇" : "🔊"}
      </button>

      {/* Theme Switcher: Sore vs Malam */}
      <button
        onClick={handleToggleTheme}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-espresso-800 transition-colors hover:bg-sand-200"
        title="Ubah Nuansa Cahaya (Golden Hour Sore vs Warm Cozy Malam)"
      >
        <span>{isNightMode ? "🌙 Malam" : "🌅 Sore"}</span>
      </button>
    </div>
  );
}
