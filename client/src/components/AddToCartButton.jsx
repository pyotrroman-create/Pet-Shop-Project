import { useDispatch, useSelector } from "react-redux";
import styles from "./AddToCartButton.module.css";
import {
    addToCart,
    removeFromCart,
} from "../store/cartSlice";

function AddToCartButton({ product }) {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.items);

    const isInCart = cart.some(
        (item) => item.id === product.id
    );

    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (isInCart) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart(product));
        }
    };

    return (
        <button
            type="button"
            className={`cart-button ${styles["cart-button"]
                } ${isInCart
                    ? styles["cart-button--added"]
                    : ""
                }`}
            onClick={handleClick}
        >
            {isInCart ? "Added" : "Add to cart"}
        </button>
    );
}

export default AddToCartButton;