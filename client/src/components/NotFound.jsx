import { Link } from "react-router-dom";
import catDogImage from "../assets/images/cat-dog.svg";
import fourImage from "../assets/images/4.svg";
import styles from "./NotFound.module.css";

function Not_foundPage() {
    return (
        <section className={styles.notFound}>
            <div className={styles.notFound__content}>
                <div className={styles.notFound__image}>
                    <img
                        src={fourImage}
                        alt="4"
                        className={styles.notFound__number}
                    />

                    <img
                        src={catDogImage}
                        alt="Cat and dog"
                        className={styles.notFound__dog}
                    />

                    <img
                        src={fourImage}
                        alt="4"
                        className={styles.notFound__number}
                    />
                </div>

                <h1 className={styles.notFound__title}>
                    Page Not Found
                </h1>

                <p className={styles.notFound__text}>
                    We’re sorry, the page you requested could not be found.
                </p>

                <p className={styles.notFound__text}>
                    Please go back to the homepage.
                </p>

                <Link
                    to="/"
                    className={styles.notFound__button}
                >
                    Go Home
                </Link>
            </div>
        </section>
    );
}

export default Not_foundPage;
