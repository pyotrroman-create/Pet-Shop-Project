import { useState } from 'react';
import styles from './DiscountForm.module.css';
import Animals from "../assets/images/Animals.svg";

export default function DiscountForm() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const [status, setStatus] = useState({
        type: '',
        message: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setStatus({
            type: '',
            message: '',
        });

        try {
            const response = await fetch('/sale/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            setStatus({
                type: 'success',
                message: 'Discount successfully applied',
            });
        } catch (error) {
            console.error(error);

            setStatus({
                type: 'error',
                message: 'Failed to submit the form',
            });
        }
    };

    return (
        <section className={styles.discount}>
            <h1 className={styles.title}>5% off on the first order</h1>

            <div className={styles.content}>
                <div className={styles.animals}>
                    <img
                        src={Animals}
                        alt="animals"
                        className={styles.animalsImage}
                    />
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className={styles.input}
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <button className={styles.button} type="submit">
                        Get a discount
                    </button>

                    {status.message && (
                        <p className={`${styles.status} ${styles[status.type]}`}>
                            {status.message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
