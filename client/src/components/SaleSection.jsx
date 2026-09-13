import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./SaleSection.module.css";
import getDiscount from "../utils/getDiscount";

const API_URL = "http://localhost:3333";

function SaleSection() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/products/all`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error loading products:", error);
            });
    }, []);

    const saleProducts = products
        .filter(
            (product) =>
                product.discont_price !== null &&
                product.discont_price !== undefined &&
                product.discont_price < product.price
        )
        .slice(0, 4);

    return (
        <section className={styles["sale-section"]}>
            <div className={styles["sale-section__header"]}>
                <h2>Sale</h2>

                <div className={styles["sale-section__line"]} />

                <Link
                    className={styles["sale-section__all"]}
                    to="/sales"
                >
                    All sales
                </Link>
            </div>

            <div className={styles["sale-section__cards"]}>
                {saleProducts.map((product) => {
                    const oldPrice = product.price;
                    const newPrice = product.discont_price;

                    const discount = getDiscount(
                        oldPrice,
                        newPrice
                    );

                    return (
                        <Link
                            to={`/products/${product.id}`}
                            key={product.id}
                            className={styles["sale-card"]}
                        >
                            <div className={styles["sale-card__image-wrapper"]}>
                                <img
                                    className={styles["sale-card__image"]}
                                    src={`${API_URL}${product.image}`}
                                    alt={product.title}
                                />

                                <span className={styles["sale-card__discount"]}>
                                    -{discount}%
                                </span>
                            </div>

                            <div className={styles["sale-card__info"]}>
                                <h3 className={styles["sale-card__title"]}>
                                    {product.title}
                                </h3>

                                <div className={styles["sale-card__prices"]}>
                                    <span className={styles["sale-card__price"]}>
                                        ${newPrice}
                                    </span>

                                    <span className={styles["sale-card__old-price"]}>
                                        ${oldPrice}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

export default SaleSection;
