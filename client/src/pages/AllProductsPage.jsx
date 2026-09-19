import AllProducts from "../components/AllProducts";

function AllProductsPage({
  cart,
  onAddToCart,
  onRemoveFromCart,
}) {
  return (
    <div>
      <AllProducts
        cart={cart}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    </div>
  );
}

export default AllProductsPage;