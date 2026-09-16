export const business = {
  name: "Kopi Sore",
  tagline: "Artisanal Coffee & Cozy Space",
  address: "Jl. Sudirman No. 25, Bekasi",
  whatsapp: "0812-3456-7890",
  whatsappIntl: "6281234567890",
  instagram: "@kopisore.id",
  instagramUrl: "https://instagram.com/kopisore.id",
  hours: "Senin – Minggu, 08.00 – 22.00 WIB",
};

export type Category =
  | "Semua"
  | "Signature"
  | "Milk-Based"
  | "Classic Espresso"
  | "Non-Coffee"
  | "Sweet Series";

export type MenuItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  badge?: string;
  tastingNotes: string[];
  sweetness: number; // 1-5
  intensity: number; // 1-5
  temperature: "Iced" | "Hot" | "Both";
  popular?: boolean;
};

export const menuItems: MenuItem[] = [
  {
    id: "kopi-susu-sore",
    name: "Kopi Susu Sore",
    tagline: "Signature House Blend",
    description: "Double shot espresso, fresh full cream milk, dan gula aren organik cair khas Kopi Sore.",
    price: 18000,
    image: "https://images.pexels.com/photos/18281882/pexels-photo-18281882.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    category: "Signature",
    badge: "Best Seller ⭐",
    tastingNotes: ["Gula Aren", "Creamy", "Nutty"],
    sweetness: 4,
    intensity: 3,
    temperature: "Iced",
    popular: true,
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    tagline: "Sweet & Buttery",
    description: "Layered espresso dengan vanilla infused milk dan butter caramel drizzle khas Italia.",
    price: 24000,
    originalPrice: 28000,
    image: "https://images.pexels.com/photos/16008331/pexels-photo-16008331.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    category: "Sweet Series",
    badge: "Favorit",
    tastingNotes: ["Rich Butter", "Caramel Drizzle", "Velvety"],
    sweetness: 5,
    intensity: 3,
    temperature: "Both",
    popular: true,
  },
  {
    id: "caffe-latte",
    name: "Caffè Latte",
    tagline: "Smooth & Balanced",
    description: "Espresso murni 100% Arabica dengan steamed fresh milk bertekstur microfoam halus.",
    price: 22000,
    image: "https://images.pexels.com/photos/6895939/pexels-photo-6895939.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    category: "Milk-Based",
    tastingNotes: ["Silky Milk", "Mild Roast", "Cocoa"],
    sweetness: 2,
    intensity: 3,
    temperature: "Both",
  },
  {
    id: "iced-americano",
    name: "Iced Americano",
    tagline: "Clean & Refreshing",
    description: "Double shot espresso single origin diseduh dingin dengan es batu kristal bersih.",
    price: 20000,
    image: "https://images.pexels.com/photos/33542180/pexels-photo-33542180.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    category: "Classic Espresso",
    badge: "Diet Friendly",
    tastingNotes: ["Bright Citrus", "Dark Chocolate", "Clean Finish"],
    sweetness: 1,
    intensity: 5,
    temperature: "Both",
    popular: true,
  },
  {
    id: "cappuccino",
    name: "Cappuccino Art",
    tagline: "Rich & Foamy",
    description: "Kombinasi klasik seimbang antara espresso pekat, hot milk, dan foam susu tebal.",
    price: 20000,
    image: "https://images.pexels.com/photos/35054360/pexels-photo-35054360.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    category: "Milk-Based",
    tastingNotes: ["Dense Foam", "Toasted Almond", "Bold"],
    sweetness: 2,
    intensity: 4,
    temperature: "Hot",
  },
  {
    id: "kyoto-matcha",
    name: "Iced Kyoto Matcha",
    tagline: "Ceremonial Grade",
    description: "Matcha premium asal Uji Jepang dipadukan dengan fresh milk lembut dan aroma earthy.",
    price: 24000,
    image: "https://images.pexels.com/photos/32713604/pexels-photo-32713604.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    category: "Non-Coffee",
    badge: "New 🍃",
    tastingNotes: ["Authentic Green Tea", "Creamy", "Earthy"],
    sweetness: 3,
    intensity: 3,
    temperature: "Both",
  },
  {
    id: "belgian-chocolate",
    name: "Belgian Chocolate",
    tagline: "Rich & Creamy",
    description: "Kakao Belgia 70% dark diseduh hangat/dingin dengan susu segar dan marshmallow lembut.",
    price: 20000,
    image: "https://images.pexels.com/photos/29325670/pexels-photo-29325670.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    category: "Non-Coffee",
    tastingNotes: ["Dark Cocoa", "Melted Marshmallow", "Decadent"],
    sweetness: 4,
    intensity: 4,
    temperature: "Both",
  },
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    tagline: "Silky Condensed Milk",
    description: "Espresso bold dengan susu kental manis lembut dan fresh milk segar dingin.",
    price: 23000,
    image: "https://images.pexels.com/photos/29070514/pexels-photo-29070514.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    category: "Sweet Series",
    tastingNotes: ["Sweet Milk", "Espresso Punch", "Smooth"],
    sweetness: 4,
    intensity: 4,
    temperature: "Iced",
  },
];

export const categories: Category[] = [
  "Semua",
  "Signature",
  "Milk-Based",
  "Classic Espresso",
  "Sweet Series",
  "Non-Coffee",
];

export const reasons = [
  {
    icon: "🌱",
    title: "100% Specialty Beans",
    description:
      "Biji kopi Arabica & Robusta pilihan dari petani lokal Jawa Barat & Aceh Gayo, disangrai fresh setiap minggu.",
  },
  {
    icon: "🛋️",
    title: "Aesthetic Warm Space",
    description:
      "Suasana minimalis warm-beige dengan meja ergonomis, colokan di setiap sudut & Wi-Fi kencang 100 Mbps.",
  },
  {
    icon: "🏷️",
    title: "Ramah di Kantong",
    description:
      "Kualitas cafe specialty dengan harga mulai Rp18.000 — pas buat nongkrong harian pelajar & pekerja.",
  },
  {
    icon: "⏱️",
    title: "Fast & Clean Brew",
    description:
      "Mesin espresso profesional La Marzocco dan air mineral filtered 5 tahap menjamin rasa kopi konsisten.",
  },
];

export const testimonials = [
  {
    name: "Andi Pratama",
    role: "Mahasiswa Teknik UNJ",
    quote:
      "Tempatnya nyaman banget buat nugas dan kopinya enak parah. Kopi Susu Sore-nya udah jadi asupan wajib tiap ngerjain tugas akhir!",
    rating: 5,
    initial: "A",
    tag: "Langganan sejak 2022",
  },
  {
    name: "Sinta Maharani",
    role: "Content Creator & Freelancer",
    quote:
      "Harganya masih ramah banget di kantong, tempatnya super estetik ala cafe Korea! Cahaya sore masuk ke meja bikin foto estetik tanpa filter.",
    rating: 5,
    initial: "S",
    tag: "Verified Coffee Lover",
  },
  {
    name: "Rizky Ramadhan",
    role: "Software Engineer",
    quote:
      "Spot WFC terbaik di Bekasi. Colokan banyak, Wi-Fi stabil buat Google Meet, plus Caramel Macchiatonya bikin fokus kerja seharian.",
    rating: 5,
    initial: "R",
    tag: "WFC Routine",
  },
];

export const faqs = [
  {
    q: "Apakah Kopi Sore nyaman untuk nugas dan WFC?",
    a: "Sangat nyaman! Kami menyediakan Wi-Fi 100 Mbps berkecepatan tinggi, colokan listrik di hampir setiap meja, pendingin ruangan sejuk, dan playlist musik lo-fi/akustik yang tenang.",
  },
  {
    q: "Berapa jam operasional dan apakah ada batas waktu duduk?",
    a: "Kami buka setiap hari Senin – Minggu dari pukul 08.00 – 22.00 WIB. Tidak ada batas waktu duduk, silakan menikmati waktu santaimu!",
  },
  {
    q: "Apakah bisa request level gula (less sweet) atau jenis susu?",
    a: "Bisa banget! Kamu bisa request Normal / Less Sweet / No Sugar, serta opsi Oat Milk / Almond Milk saat memesan langsung maupun via WhatsApp.",
  },
  {
    q: "Bagaimana cara pesan untuk delivery atau take away?",
    a: "Kamu bisa klik tombol 'Checkout WhatsApp' di keranjang website ini, pilih menu favoritmu, dan pesan langsung terkirim ke WhatsApp barista kami.",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Interactive", href: "#interactive" },
  { label: "About", href: "#about" },
  { label: "Kenapa Kami", href: "#why" },
  { label: "Review", href: "#testimonial" },
  { label: "Kontak", href: "#contact" },
];
