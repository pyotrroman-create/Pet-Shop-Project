import PromotionsSection from '../components/PromotionsSection';
import CategoriesSection from '../components/CategoriesSection';
import DiscountForm from '../components/DiscountForm';
import SaleSection from '../components/SaleSection';

function HomePage() {
  return (
    <div>
      <PromotionsSection />
      <CategoriesSection />
      <DiscountForm />
      <SaleSection />
    </div>
  );
}

export default HomePage;