import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductDetails.module.css";
import getDiscount from "../utils/getDiscount";
import Breadcrumbs from "../ui/Breadcrumbs";

import {
    addToCart,
    removeFromCart,
} from "../store/cartSlice";

const API_URL = "http://localhost:3333";

function ProductDetails() {
    const { productId } = useParams();
    const location = useLocation();

    const dispatch = useDispatch();

    const cart = useSelector(
        (state) => state.cart.items
    );

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);

    const descriptionRef = useRef(null);
    const descriptionTextRef = useRef(null);
    const descriptionTitleRef = useRef(null);
    const readMoreRef = useRef(null);

    const [descriptionLines, setDescriptionLines] =
        useState(null);

    const [isDescriptionExpanded, setIsDescriptionExpanded] =
        useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(
                    `${API_URL}/products/${productId}`
                );

                console.log(
                    "Product response:",
                    response.data
                );

                const productData = Array.isArray(
                    response.data
                )
                    ? response.data[0]
                    : response.data.product ??
                    response.data;

                setProduct(productData);
            } catch (error) {
                console.error(
                    "Error loading product:",
                    error
                );

                console.error(
                    "Backend response:",
                    error.response?.data
                );

                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            loadProduct();
        }
    }, [productId]);

    useLayoutEffect(() => {
        const calculateDescriptionLines = () => {
            const description =
                descriptionRef.current;

            const title =
                descriptionTitleRef.current;

            const text =
                descriptionTextRef.current;

            const readMore =
                readMoreRef.current;

            if (
                !description ||
                !title ||
                !text ||
                !readMore
            ) {
                return;
            }

            text.style.webkitLineClamp = "unset";

            const textStyles =
                window.getComputedStyle(text);

            const titleStyles =
                window.getComputedStyle(title);

            const lineHeight =
                parseFloat(textStyles.lineHeight);

            if (!lineHeight) {
                return;
            }

            const descriptionHeight =
                description.clientHeight;

            const titleHeight =
                title.getBoundingClientRect().height;

            const titleMarginBottom =
                parseFloat(
                    titleStyles.marginBottom
                ) || 0;

            const readMoreHeight =
                readMore.getBoundingClientRect().height;

            const readMoreMarginTop = 16;

            const availableHeight =
                descriptionHeight -
                titleHeight -
                titleMarginBottom -
                readMoreHeight -
                readMoreMarginTop;
            const lines = Math.max(
                1,
                Math.floor(
                    availableHeight / lineHeight
                )
            );

            setDescriptionLines(lines);

            if (!isDescriptionExpanded) {
                text.style.webkitLineClamp =
                    String(lines);
            } else {
                text.style.webkitLineClamp = "unset";
            }
        };

        calculateDescriptionLines();

        const resizeObserver =
            new ResizeObserver(
                calculateDescriptionLines
            );

        if (descriptionRef.current) {
            resizeObserver.observe(
                descriptionRef.current
            );
        }

        window.addEventListener(
            "resize",
            calculateDescriptionLines
        );

        return () => {
            resizeObserver.disconnect();

            window.removeEventListener(
                "resize",
                calculateDescriptionLines
            );
        };
    }, [
        product?.description,
        product?.title,
        isDescriptionExpanded,
    ]);

    const handleCartClick = () => {
        if (!product) {
            return;
        }

        const isInCart = cart.some(
            (item) => item.id === product.id
        );

        if (isInCart) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(
                addToCart({
                    product,
                    quantity,
                })
            );
        }
    };

    const handleDecrease = () => {
        setQuantity((currentQuantity) =>
            Math.max(1, currentQuantity - 1)
        );
    };

    const handleIncrease = () => {
        setQuantity(
            (currentQuantity) =>
                currentQuantity + 1
        );
    };

    if (loading) {
        return (
            <main className={styles["product-page"]}>
                <p
                    className={
                        styles[
                        "product-page__loading"
                        ]
                    }
                >
                    Loading...
                </p>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className={styles["product-page"]}>
                <p
                    className={
                        styles[
                        "product-page__error"
                        ]
                    }
                >
                    {error || "Product not found."}
                </p>
            </main>
        );
    }

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

    const currentPrice = hasDiscount
        ? product.discont_price
        : product.price;

    const isInCart = cart.some(
        (item) => item.id === product.id
    );

    const breadcrumbItems =
        location.state?.breadcrumbs ?? [
            {
                label: "Main Page",
                to: "/",
            },
            {
                label: product.title,
            },
        ];

    return (
        <main className={styles["product-page"]}>
            <Breadcrumbs items={breadcrumbItems} />

            <div
                className={
                    styles["product-page__content"]
                }
            >
                <div
                    className={
                        styles["product-page__gallery"]
                    }
                >
                    <div
                        className={
                            styles[
                            "product-page__main-image-wrapper"
                            ]
                        }
                    >
                        <img
                            className={
                                styles[
                                "product-page__main-image"
                                ]
                            }
                            src={`${API_URL}${product.image}`}
                            alt={product.title}
                        />
                    </div>
                </div>

                <div
                    className={
                        styles["product-page__info"]
                    }
                    style={
                        isDescriptionExpanded
                            ? {
                                height: "auto",
                            }
                            : undefined
                    }
                >
                    <h1
                        className={
                            styles[
                            "product-page__title"
                            ]
                        }
                    >
                        {product.title}
                    </h1>

                    <div
                        className={
                            styles[
                            "product-page__prices"
                            ]
                        }
                    >
                        <span
                            className={
                                styles[
                                "product-page__price"
                                ]
                            }
                        >
                            ${currentPrice}
                        </span>

                        {hasDiscount && (
                            <div
                                className={
                                    styles[
                                    "product-page__old-price-wrapper"
                                    ]
                                }
                            >
                                <span
                                    className={
                                        styles[
                                        "product-page__old-price"
                                        ]
                                    }
                                >
                                    ${product.price}
                                </span>

                                <span
                                    className={
                                        styles[
                                        "product-page__discount"
                                        ]
                                    }
                                >
                                    -{discount}%
                                </span>
                            </div>
                        )}
                    </div>

                    <div
                        className={
                            styles[
                            "product-page__cart-row"
                            ]
                        }
                    >
                        <div
                            className={
                                styles[
                                "product-page__quantity"
                                ]
                            }
                        >
                            <button
                                type="button"
                                onClick={handleDecrease}
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>

                            <span>{quantity}</span>
                            <button
                                type="button"
                                onClick={handleIncrease}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            className={`${styles[
                                "product-page__cart-button"
                            ]} ${isInCart
                                ? styles[
                                "product-page__cart-button--added"
                                ]
                                : ""
                                }`}
                            onClick={handleCartClick}
                        >
                            {isInCart
                                ? "Added to cart"
                                : "Add to cart"}
                        </button>
                    </div>

                    <div
                        ref={descriptionRef}
                        className={
                            styles[
                            "product-page__description"
                            ]
                        }
                        style={
                            isDescriptionExpanded
                                ? {
                                    flex: "none",
                                    overflow: "visible",
                                }
                                : undefined
                        }
                    >
                        <h2 ref={descriptionTitleRef}>
                            Description
                        </h2>

                        <p
                            ref={descriptionTextRef}
                            style={
                                isDescriptionExpanded
                                    ? {
                                        display: "block",
                                        WebkitLineClamp:
                                            "unset",
                                        overflow:
                                            "visible",
                                        maxHeight:
                                            "none",
                                    }
                                    : descriptionLines
                                        ? {
                                            WebkitLineClamp:
                                                descriptionLines,
                                        }
                                        : undefined
                            }
                        >
                            {product.description ||
                                "No description available."}
                        </p>

                        <button
                            ref={readMoreRef}
                            type="button"
                            className={
                                styles[
                                "product-page__read-more"
                                ]
                            }
                            style={
                                isDescriptionExpanded
                                    ? undefined
                                    : {
                                        marginTop: "auto",
                                    }
                            }
                            onClick={() =>
                                setIsDescriptionExpanded(
                                    (current) =>
                                        !current
                                )
                            }
                        >
                            {isDescriptionExpanded
                                ? "Read less"
                                : "Read more"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetails;