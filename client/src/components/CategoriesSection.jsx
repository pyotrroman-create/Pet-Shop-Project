import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./CategoriesSection.module.css";

function CategoriesSection() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3333/categories/all")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Ошибка:", error);
            });
    }, []);

    return (
        <section className={styles.categories}>
            <div className={styles["categories__header"]}>
                <h2>Categories</h2>

                <div className={styles["categories__line"]} />

                <Link
                    className={styles["categories__all"]}
                    to="/categories"
                >
                    All categories
                </Link>
            </div>

            <div className={styles["categories__list"]}>
                {categories.slice(0, 4).map((category) => (
                    <Link
                        className={styles["category-card"]}
                        key={category.id}
                        to={`/categories/${category.id}`}
                    >
                        <img
                            className={styles["category-card__image"]}
                            src={`http://localhost:3333${category.image}`}
                            alt={category.title}
                        />

                        <h3 className={styles["category-card__title"]}>
                            {category.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default CategoriesSection;