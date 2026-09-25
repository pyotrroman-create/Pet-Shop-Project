import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./Header.module.css";
import logo from "../assets/icons/Logo.svg";
import cartIcon from "../assets/icons/cart.svg";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cart = useSelector(
        (state) => state.cart.items
    );

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>

                <Link
                    to="/"
                    className={styles.header__logo}
                    onClick={closeMenu}
                >
                    <img
                        src={logo}
                        alt="Pet Shop"
                        className={styles.header__logoImg}
                    />
                </Link>

                <nav
                    className={`${styles.header__nav} ${isMenuOpen
                        ? styles.header__nav_open
                        : ""
                        }`}
                >
                    <NavLink
                        to="/"
                        className={styles.header__link}
                        end
                        onClick={closeMenu}
                    >
                        Main Page
                    </NavLink>

                    <NavLink
                        to="/categories"
                        className={styles.header__link}
                        onClick={closeMenu}
                    >
                        Categories
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={styles.header__link}
                        onClick={closeMenu}
                    >
                        All products
                    </NavLink>

                    <NavLink
                        to="/sales"
                        className={styles.header__link}
                        onClick={closeMenu}
                    >
                        All sales
                    </NavLink>
                </nav>

                <div className={styles.header__actions}>

                    <button
                        type="button"
                        className={`${styles.header__burger} ${isMenuOpen
                            ? styles.header__burger_open
                            : ""
                            }`}
                        onClick={() =>
                            setIsMenuOpen(!isMenuOpen)
                        }
                        aria-label={
                            isMenuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                        aria-expanded={isMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <Link
                        to="/cart"
                        className={styles.header__cart}
                    >
                        <img
                            src={cartIcon}
                            alt="Cart"
                            className={styles.header__cartIcon}
                        />

                        {cartCount > 0 && (
                            <span
                                className={
                                    styles.header__cartCount
                                }
                            >
                                {cartCount}
                            </span>
                        )}
                    </Link>

                </div>
            </div>
        </header>
    );
}

export default Header;