import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";

function ProductPage({
  cart,
  onAddToCart,
  onRemoveFromCart,
}) {
  const { productId } = useParams();

  return (
    <div>
      <ProductDetails
        productId={productId}
        cart={cart}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    </div>
  );
}

export default ProductPage;
