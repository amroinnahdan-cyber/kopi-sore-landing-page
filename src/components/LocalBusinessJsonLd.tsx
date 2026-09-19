import { menuItems, business } from "@/lib/data";

export default function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: business.name,
    description: "Coffee shop minimalis di Bekasi dengan kopi specialty, Wi-Fi 100 Mbps, dan suasana cozy untuk nugas maupun WFC.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Sudirman No. 25",
      addressLocality: "Bekasi",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    telephone: business.whatsapp,
    servesCuisine: ["Coffee", "Non-Coffee", "Pastry"],
    priceRange: "Rp18.000–Rp28.000",
    openingHours: "Mo-Su 08:00-22:00",
    sameAs: [business.instagramUrl],
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: {
        "@type": "MenuSection",
        name: "Menu Kopi Sore",
        hasMenuItem: menuItems.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "IDR",
          },
        })),
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
