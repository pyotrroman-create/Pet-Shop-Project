import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./CategoryProducts.module.css";
import getDiscount from "../utils/getDiscount";
import Filter from "../ui/Filter";
import Breadcrumbs from "../ui/Breadcrumbs";
import AddToCartButton from "./AddToCartButton";

const API_URL = "http://localhost:3333";

function CategoryProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [discountedOnly, setDiscountedOnly] = useState(false);
    const [sort, setSort] = useState("default");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `${API_URL}/products/all`
                );

                console.log(
                    "Products response:",
                    response.data
                );

                setProducts(response.data ?? []);
            } catch (error) {
                console.error(
                    "Error loading products:",
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

        loadProducts();
    }, []);

    const breadcrumbItems = [
        {
            label: "Main page",
            to: "/",
        },
        {
            label: "All products",
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
                All products
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
                                breadcrumbs: [
                                    {
                                        label: "Main Page",
                                        to: "/",
                                    },
                                    {
                                        label: "All Products",
                                        to: "/products",
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