import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HomePage from "./pages/HomePage";
import All_productsPage from "./pages/All_productsPage";
import All_salesPage from "./pages/All_salesPage";
import CartPage from "./pages/CartPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryProductsPage from "./pages/Category-productsPage";
import ProductPage from "./pages/ProductPage";
import Not_foundPage from "./pages/Not_foundPage";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((currentCart) => {
      if (currentCart.some((item) => item.id === product.id)) {
        return currentCart;
      }

      return [...currentCart, product];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  return (
    <>
      <Header cartCount={cart.length} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cart={cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />

          <Route
            path="/products"
            element={
              <All_productsPage
                cart={cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />

          <Route
            path="/sales"
            element={
              <All_salesPage
                cart={cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />

          <Route
            path="/cart"
            element={<CartPage cart={cart} />}
          />

          <Route path="/categories" element={<CategoriesPage />} />

          <Route
            path="/categories/:categoryId"
            element={
              <CategoryProductsPage
                cart={cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />

          <Route
            path="/products/:productId"
            element={<ProductPage />}
          />

          <Route path="*" element={<Not_foundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;