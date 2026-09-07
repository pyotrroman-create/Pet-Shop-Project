import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";

import logo from "../assets/icons/Logo.svg";
import cartIcon from "../assets/icons/cart.svg";

function Header({ cartCount = 0 }) {
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>

                <Link to="/" className={styles.header__logo}>
                    <img
                        src={logo}
                        alt="Pet Shop"
                        className={styles.header__logoImg}
                    />
                </Link>

                <nav className={styles.header__nav}>
                    <NavLink
                        to="/"
                        className={styles.header__link}
                        end
                    >
                        Main Page
                    </NavLink>

                    <NavLink
                        to="/categories"
                        className={styles.header__link}
                    >
                        Categories
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={styles.header__link}
                    >
                        All products
                    </NavLink>

                    <NavLink
                        to="/sales"
                        className={styles.header__link}
                    >
                        All sales
                    </NavLink>
                </nav>

                <Link to="/cart" className={styles.header__cart}>
                    <img
                        src={cartIcon}
                        alt="Cart"
                        className={styles.header__cartIcon}
                    />

                    {cartCount > 0 && (
                        <span className={styles.header__cartCount}>
                            {cartCount}
                        </span>
                    )}
                </Link>

            </div>
        </header>
    );
}

export default Header;