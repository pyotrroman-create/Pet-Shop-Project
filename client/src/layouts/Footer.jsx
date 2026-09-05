import styles from './Footer.module.css';
import instagramIcon from '../assets/icons/ic-instagram.svg';
import whatsappIcon from '../assets/icons/ic-whatsapp.svg';

export default function Footer() {
    return (
        <section className={styles.contact}>
            <h1 className={styles.title}>Contact</h1>

            <div className={styles.grid}>

                <div className={`${styles.card} ${styles.phone}`}>
                    <span className={styles.label}>Phone</span>

                    <a
                        href="tel:+493091588492"
                        className={styles.value}
                    >
                        +49 30 915-88492
                    </a>
                </div>


                <div className={`${styles.card} ${styles.social}`}>
                    <span className={styles.label}>Socials</span>

                    <div className={styles.socials}>
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className={styles.socialLink}
                        >
                            <img
                                src={instagramIcon}
                                alt="Instagram"
                                className={styles.icon}
                            />
                        </a>

                        <a
                            href="https://wa.me/493091588492"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className={styles.socialLink}
                        >
                            <img
                                src={whatsappIcon}
                                alt="WhatsApp"
                                className={styles.icon}
                            />
                        </a>
                    </div>
                </div>


                <div className={`${styles.card} ${styles.addressCard}`}>
                    <span className={styles.label}>Address</span>

                    <address className={styles.address}>
                        Wallstraße 9-13, 10179 Berlin,
                        <br />
                        Deutschland
                    </address>
                </div>


                <div className={`${styles.card} ${styles.workingHours}`}>
                    <span className={styles.label}>Working Hours</span>

                    <span className={styles.value}>
                        24 hours a day
                    </span>
                </div>
            </div>

            <div className={styles.mapContainer}>
                <a
                    href="https://www.google.com/maps/search/?api=1&query=Wallstraße%209-13%2C%2010179%20Berlin%2C%20Deutschland"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open location in Google Maps"
                >
                    <iframe
                        src="https://www.google.com/maps?q=Wallstraße%209-13%2C%2010179%20Berlin%2C%20Deutschland&output=embed"
                        style={{ border: 0 }}
                        loading="lazy"
                        title="Wallstraße 9-13, 10179 Berlin"
                    />
                </a>
            </div>
        </section>
    );
}