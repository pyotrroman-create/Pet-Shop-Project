import { useParams } from "react-router-dom";

function Category_productsPage() {
  const { categoryId } = useParams();

  return (
    <div>
      <h1>Category Products</h1>
      <p>Category ID: {categoryId}</p>
    </div>
  );
}

export default Category_productsPage;