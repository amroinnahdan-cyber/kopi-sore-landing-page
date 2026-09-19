import CinematicHero from "@/components/CinematicHero";
import ProductTheatre from "@/components/ProductTheatre";
import EditorialExperience from "@/components/EditorialExperience";
import SocialProof from "@/components/SocialProof";
import CartDrawer from "@/components/CartDrawer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <main>
        <CinematicHero />
        <ProductTheatre />
        <EditorialExperience />
        <SocialProof />
      </main>
      <CartDrawer />
      <FloatingWhatsApp />
    </>
  );
}
