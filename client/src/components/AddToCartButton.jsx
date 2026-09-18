import styles from "./AddToCartButton.module.css";

function AddToCartButton({
    product,
    isInCart,
    onAddToCart,
    onRemoveFromCart,
}) {
    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (isInCart) {
            onRemoveFromCart(product.id);
        } else {
            onAddToCart(product);
        }
    };
    return (
        <button
            type="button"
            className={`cart-button ${styles["cart-button"]} ${isInCart ? styles["cart-button--added"] : ""
                }`}
            onClick={handleClick}
        >
            {isInCart ? "Added" : "Add to cart"}
        </button>
    );
}

export default AddToCartButton;