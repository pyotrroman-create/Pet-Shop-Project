import CategoryProducts from "../components/CategoryProducts";

function Category_productsPage({
  cart,
  onAddToCart,
  onRemoveFromCart,
}) {
  return (
    <div>
      <CategoryProducts
        cart={cart}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    </div>
  );
}

export default Category_productsPage;