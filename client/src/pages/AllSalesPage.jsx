import DiscountedItems from '../components/DiscountedItems';

function AllSalesPage({
  cart,
  onAddToCart,
  onRemoveFromCart,
}) {
  return (
    <div>
      <DiscountedItems
        cart={cart}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    </div>
  );
}

export default AllSalesPage;





