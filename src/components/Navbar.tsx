"use client";

import { useEffect, useState } from "react";
import { business, navLinks } from "@/lib/data";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waLink = `https://wa.me/${business.whatsappIntl}?text=${encodeURIComponent(
    "Halo Kopi Sore, saya mau tanya menu atau pesan kopi ☕"
  )}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-sand-200/80 bg-sand-50/90 py-3 shadow-xs backdrop-blur-md"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 transition-transform active:scale-95"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso-900 text-base text-sand-100 shadow-sm transition-transform group-hover:scale-105 group-hover:bg-terracotta">
              ☕
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-espresso-900 sm:text-2xl">
                Kopi Sore
              </span>
              <span className="text-[9px] font-semibold tracking-[0.25em] text-terracotta uppercase">
                Bekasi • Est. 2021
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-xs font-semibold tracking-wider text-espresso-800 uppercase transition-colors hover:text-terracotta after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-terracotta after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Fast CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-sand-300 bg-sand-100 px-4 py-2 text-xs font-bold tracking-wider text-espresso-900 uppercase transition-all hover:border-terracotta hover:bg-terracotta hover:text-white sm:inline-flex"
            >
              Order Online
            </a>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              aria-label="Buka keranjang belanja"
              className="group relative flex h-10 items-center gap-2 rounded-full bg-espresso-900 px-3.5 text-sand-100 shadow-sm transition-all hover:bg-terracotta active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="hidden text-xs font-bold sm:inline">Keranjang</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-terracotta px-1 text-[11px] font-black text-white group-hover:bg-sand-100 group-hover:text-espresso-900">
                {totalItems}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigasi mobile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 bg-sand-100 text-espresso-900 transition-colors hover:bg-sand-200 lg:hidden"
            >
              <div className="flex h-3.5 w-4 flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-espresso-900 transition-transform duration-300 ${
                    mobileOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-espresso-900 transition-opacity duration-200 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-espresso-900 transition-transform duration-300 ${
                    mobileOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 z-45 h-full w-[80%] max-w-xs border-l border-sand-200 bg-sand-50 p-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-sand-200 pb-4">
          <span className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso-900">
            Menu Navigasi
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-lg text-espresso-700"
            aria-label="Tutup menu"
          >
            ✕
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-espresso-800 transition-colors hover:bg-sand-200 hover:text-terracotta"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-sand-200 pt-6">
          <p className="text-xs text-espresso-700/70">Jam Operasional:</p>
          <p className="font-semibold text-espresso-900">{business.hours}</p>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-espresso-900 py-3 text-xs font-bold uppercase tracking-wider text-sand-50"
          >
            <span>💬</span> WhatsApp Order
          </a>
        </div>
      </div>
    </>
  );
}
