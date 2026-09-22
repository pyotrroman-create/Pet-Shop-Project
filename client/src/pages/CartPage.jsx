import Cart from "../components/Cart";

function CartPage({
  cart,
  onRemoveFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}) {
  return (
    <div>
      <Cart
        cart={cart}
        onRemoveFromCart={onRemoveFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
    </div>
  );
}

export default CartPage;








