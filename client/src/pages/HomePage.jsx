import PromotionsSection from "../components/PromotionsSection";
import CategoriesSection from "../components/CategoriesSection";
import DiscountForm from "../components/DiscountForm";
import SaleSection from "../components/SaleSection";

function HomePage({
  cart,
  onAddToCart,
  onRemoveFromCart,
}) {
  return (
    <div>
      <PromotionsSection />

      <CategoriesSection />

      <DiscountForm />

      <SaleSection
        cart={cart}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    </div>
  );
}

export default HomePage;