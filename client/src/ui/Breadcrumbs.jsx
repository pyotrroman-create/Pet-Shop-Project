import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

function Breadcrumbs({ items = [] }) {
    return (
        <div className={styles.breadcrumbs}>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return isLast ? (
                    <span
                        key={item.label}
                        className={styles.breadcrumbs__itemActive}
                    >
                        {item.label}
                    </span>
                ) : (
                    <Link
                        key={item.label}
                        to={item.to}
                        className={styles.breadcrumbs__item}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </div>
    );
}

export default Breadcrumbs;
