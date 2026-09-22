import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./Cart.module.css";


const API_URL = "http://localhost:3333";

function Cart({
    cart,
    onRemoveFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [orderError, setOrderError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const getProductPrice = (product) => {
        return product.discont_price ?? product.price;
    };

    const totalPrice = cart.reduce(
        (total, product) => {
            const price = getProductPrice(product);

            return total + price * product.quantity;
        },
        0
    );

    const onSubmit = async (formData) => {
        try {
            setIsSending(true);
            setOrderError("");

            const orderData = {
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                email: formData.email,

                cart: cart.map((product) => ({
                    id: product.id,
                    quantity: product.quantity,
                })),
            };

            console.log("Order data:", orderData);

            await axios.post(`${API_URL}/order/send`, orderData);

            setIsModalOpen(true);
        } catch (error) {
            console.error("Error sending order:", error);
            console.error("Backend response:", error.response?.data);

            setOrderError(
                "Something went wrong. Please try again."
            );
        } finally {
            setIsSending(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        clearCart();
        reset();
    };

    if (cart.length === 0) {
        return (
            <main className={styles["cart-page"]}>
                <div className={styles["cart-page__header"]}>
                    <h1>Shopping cart</h1>

                    <div className={styles["cart-page__line"]}></div>

                    <Link
                        to="/categories"
                        className={styles["cart-page__back-button"]}
                    >
                        Back to the store
                    </Link>
                </div>

                <div className={styles["cart-page__empty"]}>
                    <p>
                        Looks like you have no items in your basket currently.
                    </p>

                    <Link
                        to="/categories"
                        className={styles["cart-page__shop-button"]}
                    >
                        Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles["cart-page"]}>
            <div className={styles["cart-page__header"]}>
                <h1>Shopping cart</h1>

                <div className={styles["cart-page__line"]}></div>

                <Link
                    to="/categories"
                    className={styles["cart-page__back-button"]}
                >
                    Back to the store
                </Link>
            </div>

            <div className={styles["cart-page__content"]}>
                <div className={styles["cart-page__items"]}>
                    {cart.map((product) => {
                        const currentPrice = getProductPrice(product);
                        const hasDiscount =
                            product.discont_price != null &&
                            product.discont_price < product.price;

                        return (
                            <article
                                className={styles["cart-item"]}
                                key={product.id}
                            >
                                <Link
                                    to={`/products/${product.id}`}
                                    className={styles["cart-item__image-wrapper"]}
                                >
                                    <img
                                        src={`${API_URL}${product.image}`}
                                        alt={product.title}
                                        className={styles["cart-item__image"]}
                                    />
                                </Link>

                                <div className={styles["cart-item__info"]}>
                                    <Link
                                        to={`/products/${product.id}`}
                                        className={styles["cart-item__title"]}
                                    >
                                        {product.title}
                                    </Link>

                                    <div className={styles["cart-item__bottom"]}>
                                        <div className={styles["cart-item__quantity"]}>
                                            <button
                                                type="button"
                                                onClick={() => decreaseQuantity(product.id)}
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>

                                            <span>{product.quantity}</span>

                                            <button
                                                type="button"
                                                onClick={() => increaseQuantity(product.id)}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className={styles["cart-item__prices"]}>
                                            <span className={styles["cart-item__price"]}>
                                                ${currentPrice}
                                            </span>

                                            {hasDiscount && (
                                                <span
                                                    className={styles["cart-item__old-price"]}
                                                >
                                                    ${product.price}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className={styles["cart-item__remove"]}
                                    onClick={() => onRemoveFromCart(product.id)}
                                    aria-label={`Remove ${product.title} from cart`}
                                >
                                    ×
                                </button>
                            </article>
                        );
                    })}
                </div>

                <aside className={styles["order-details"]}>
                    <h2>Order details</h2>

                    <div className={styles["order-details__row"]}>
                        <span>
                            {totalItems}{" "}
                            {totalItems === 1 ? "item" : "items"}
                        </span>
                    </div>

                    <div className={styles["order-details__total"]}>
                        <span>Total</span>

                        <strong>${totalPrice.toFixed(2).replace(".", ",")}</strong>
                    </div>

                    <form
                        className={styles["order-form"]}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />

                        {errors.name && (
                            <span className={styles["order-form__error"]}>
                                {errors.name.message}
                            </span>
                        )}

                        <input
                            type="tel"
                            placeholder="Phone number"
                            {...register("phoneNumber", {
                                required: "Phone number is required",
                            })}
                        />

                        {errors.phoneNumber && (
                            <span className={styles["order-form__error"]}>
                                {errors.phoneNumber.message}
                            </span>
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />

                        {errors.email && (
                            <span className={styles["order-form__error"]}>
                                {errors.email.message}
                            </span>
                        )}

                        {orderError && (
                            <p className={styles["order-form__error-message"]}>
                                {orderError}
                            </p>
                        )}
                        <button
                            type="submit"
                            className={styles["order-form__submit"]}
                            disabled={isSending}
                        >
                            {isSending ? "Sending..." : "Order"}
                        </button>
                    </form>
                </aside>
            </div>

            {isModalOpen && (
                <div className={styles["order-modal"]}>
                    <div className={styles["order-modal__content"]}>
                        <button
                            type="button"
                            className={styles["order-modal__close"]}
                            onClick={handleCloseModal}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <h2>Congratulations!</h2>

                        <p>
                            Your order has been successfully placed on the website.
                        </p>

                        <p>
                            A manager will contact you shortly to confirm your order.
                        </p>

                        <button
                            type="button"
                            className={styles["order-modal__button"]}
                            onClick={handleCloseModal}
                        >
                            Continue shopping
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Cart;