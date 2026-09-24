import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./CategoryProducts.module.css";
import getDiscount from "../utils/getDiscount";
import Filter from "../ui/Filter";
import Breadcrumbs from "../ui/Breadcrumbs";
import AddToCartButton from "./AddToCartButton";

const API_URL = "http://localhost:3333";

function CategoryProducts() {
    const { categoryId } = useParams();
    const location = useLocation();

    const fromHome = location.state?.fromHome;

    console.log("Category ID:", categoryId);

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [discountedOnly, setDiscountedOnly] =
        useState(false);
    const [sort, setSort] = useState("default");

    useEffect(() => {
        const loadCategory = async () => {
            try {
                setLoading(true);

                const categoryResponse = await axios.get(
                    `${API_URL}/categories/${categoryId}`
                );

                console.log(
                    "Category response:",
                    categoryResponse.data
                );

                setCategory(categoryResponse.data.category);

                setProducts(
                    categoryResponse.data.data || []
                );
            } catch (error) {
                console.error(
                    "Error loading category:",
                    error
                );

                console.error(
                    "Backend response:",
                    error.response?.data
                );

                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            loadCategory();
        }
    }, [categoryId]);

    const categoryTitle =
        category?.title || "Category";

    const breadcrumbItems = fromHome
        ? [
            {
                label: "Main Page",
                to: "/",
            },
            {
                label: categoryTitle,
            },
        ]
        : [
            {
                label: "Main Page",
                to: "/",
            },
            {
                label: "Categories",
                to: "/categories",
            },
            {
                label: categoryTitle,
            },
        ];

    const filteredProducts = [...products]
        .filter((product) => {
            const productPrice =
                product.discont_price ?? product.price;

            if (
                priceFrom !== "" &&
                productPrice < Number(priceFrom)
            ) {
                return false;
            }

            if (
                priceTo !== "" &&
                productPrice > Number(priceTo)
            ) {
                return false;
            }

            if (
                discountedOnly &&
                !(
                    product.discont_price !== null &&
                    product.discont_price !== undefined &&
                    product.discont_price < product.price
                )
            ) {
                return false;
            }

            return true;
        })
        .sort((a, b) => {
            if (sort === "price-low-high") {
                const priceA =
                    a.discont_price ?? a.price;

                const priceB =
                    b.discont_price ?? b.price;

                return priceA - priceB;
            }

            if (sort === "price-high-low") {
                const priceA =
                    a.discont_price ?? a.price;

                const priceB =
                    b.discont_price ?? b.price;

                return priceB - priceA;
            }
            if (sort === "newest") {
                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );
            }

            return 0;
        });

    if (loading) {
        return (
            <main className={styles["category-products"]}>
                <p
                    className={
                        styles[
                        "category-products__loading"
                        ]
                    }
                >
                    Loading...
                </p>
            </main>
        );
    }

    return (
        <main className={styles["category-products"]}>
            <Breadcrumbs items={breadcrumbItems} />

            <h1
                className={
                    styles["category-products__title"]
                }
            >
                {categoryTitle}
            </h1>

            <Filter
                priceFrom={priceFrom}
                priceTo={priceTo}
                discountedOnly={discountedOnly}
                sort={sort}
                onPriceFromChange={setPriceFrom}
                onPriceToChange={setPriceTo}
                onDiscountedChange={setDiscountedOnly}
                onSortChange={setSort}
            />

            <div
                className={
                    styles["category-products__cards"]
                }
            >
                {filteredProducts.map((product) => {
                    const hasDiscount =
                        product.discont_price !== null &&
                        product.discont_price !== undefined &&
                        product.discont_price < product.price;

                    const discount = hasDiscount
                        ? getDiscount(
                            product.price,
                            product.discont_price
                        )
                        : 0;

                    return (
                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            state={{
                                breadcrumbs: fromHome
                                    ? [
                                        {
                                            label: "Main Page",
                                            to: "/",
                                        },
                                        {
                                            label: categoryTitle,
                                            to: `/categories/${categoryId}`,
                                        },
                                        {
                                            label: product.title,
                                        },
                                    ]
                                    : [
                                        {
                                            label: "Main Page",
                                            to: "/",
                                        },
                                        {
                                            label: "Categories",
                                            to: "/categories",
                                        },
                                        {
                                            label: categoryTitle,
                                            to: `/categories/${categoryId}`,
                                        },
                                        {
                                            label: product.title,
                                        },
                                    ],
                            }}
                            className={
                                styles["product-card"]
                            }
                        >
                            <div
                                className={
                                    styles[
                                    "product-card__image-wrapper"
                                    ]
                                }
                            >
                                <img
                                    className={
                                        styles[
                                        "product-card__image"
                                        ]
                                    }
                                    src={`${API_URL}${product.image}`}
                                    alt={product.title}
                                />

                                {hasDiscount && (
                                    <span
                                        className={
                                            styles[
                                            "product-card__discount"
                                            ]
                                        }
                                    >
                                        -{discount}%
                                    </span>
                                )}

                                <AddToCartButton
                                    product={product}
                                />
                            </div>

                            <div
                                className={
                                    styles[
                                    "product-card__info"
                                    ]
                                }
                            >
                                <h2
                                    className={
                                        styles[
                                        "product-card__title"
                                        ]
                                    }
                                >
                                    {product.title}
                                </h2>

                                <div
                                    className={
                                        styles[
                                        "product-card__prices"
                                        ]
                                    }
                                >
                                    {hasDiscount ? (
                                        <>
                                            <span
                                                className={
                                                    styles[
                                                    "product-card__price"
                                                    ]
                                                }
                                            >
                                                $
                                                {
                                                    product.discont_price
                                                }
                                            </span>

                                            <span
                                                className={
                                                    styles[
                                                    "product-card__old-price"
                                                    ]
                                                }
                                            >
                                                ${product.price}
                                            </span>
                                        </>
                                    ) : (
                                        <span
                                            className={
                                                styles[
                                                "product-card__price"
                                                ]
                                            }
                                        >
                                            ${product.price}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}

export default CategoryProducts;