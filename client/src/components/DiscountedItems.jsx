import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./CategoryProducts.module.css";
import getDiscount from "../utils/getDiscount";
import Filter from "../ui/Filter";
import Breadcrumbs from "../ui/Breadcrumbs";
import AddToCartButton from "./AddToCartButton";

const API_URL = "http://localhost:3333";

function DiscountedItems() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
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
            label: "All sales",
        },
    ];

    const discountedProducts = [...products]
        .filter((product) => {
            const hasDiscount =
                product.discont_price !== null &&
                product.discont_price !== undefined &&
                product.discont_price < product.price;

            if (!hasDiscount) {
                return false;
            }

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
                Discounted items
            </h1>
            <Filter
                priceFrom={priceFrom}
                priceTo={priceTo}
                sort={sort}
                onPriceFromChange={setPriceFrom}
                onPriceToChange={setPriceTo}
                onSortChange={setSort}
            />

            <div
                className={
                    styles["category-products__cards"]
                }
            >
                {discountedProducts.map((product) => {
                    const discount = getDiscount(
                        product.price,
                        product.discont_price
                    );

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
                                        label: "All Sales",
                                        to: "/sales",
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

                                <span
                                    className={
                                        styles[
                                        "product-card__discount"
                                        ]
                                    }
                                >
                                    -{discount}%
                                </span>

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
                                    <span
                                        className={
                                            styles[
                                            "product-card__price"
                                            ]
                                        }
                                    >
                                        ${product.discont_price}
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
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}

export default DiscountedItems;