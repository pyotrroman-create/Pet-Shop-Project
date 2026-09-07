import { Routes, Route } from "react-router-dom";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import HomePage from "./pages/HomePage";
import All_productsPage from "./pages/All_productsPage";
import All_salesPage from "./pages/All_salesPage";
import CartPage from "./pages/CartPage";
import CategoriesPage from "./pages/CategoriesPage";
import Category_productsPage from "./pages/Category_productsPage";
import ProductPage from "./pages/ProductPage";
import Not_foundPage from "./pages/Not_foundPage";

import "./App.css";

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/products" element={<All_productsPage />} />

          <Route path="/sales" element={<All_salesPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/categories" element={<CategoriesPage />} />

          <Route
            path="/categories/:categoryId"
            element={<Category_productsPage />}
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