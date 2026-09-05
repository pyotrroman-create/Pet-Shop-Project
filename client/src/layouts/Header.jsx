import { Link } from "react-router-dom";
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
                    <Link to="/" className={styles.header__link}>
                        Main Page
                    </Link>

                    <Link to="/categories" className={styles.header__link}>
                        Categories
                    </Link>

                    <Link to="/products" className={styles.header__link}>
                        All products
                    </Link>

                    <Link to="/sales" className={styles.header__link}>
                        All sales
                    </Link>
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
