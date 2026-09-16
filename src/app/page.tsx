import CinematicHero from "@/components/CinematicHero";
import ProductTheatre from "@/components/ProductTheatre";
import EditorialExperience from "@/components/EditorialExperience";
import CartDrawer from "@/components/CartDrawer";

export default function HomePage() {
  return (
    <>
      <main>
        <CinematicHero />
        <ProductTheatre />
        <EditorialExperience />
      </main>
      <CartDrawer />
    </>
  );
}
