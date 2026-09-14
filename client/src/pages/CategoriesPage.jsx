import AllCategories from "../components/AllCategories";
import Breadcrumbs from "../ui/Breadcrumbs";
import Container from "../ui/Container";

function CategoriesPage() {
  return (
    <div>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Main page", to: "/" },
            { label: "Categories", to: "/categories" },
          ]}
        />

        <AllCategories />
      </Container>
    </div>
  );
}

export default CategoriesPage;