import heroImage from '../assets/images/hero_image.png';
import { NavLink } from 'react-router-dom';
import styles from './PromotionsSection.module.css';

const PromotionsSection = () => {
  return (
    <section className={styles.section}>
      <img
        className={styles.image}
        src={heroImage}
        alt="Dog and cat"
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h2 className={styles.title}>
          Amazing Discounts
          <br />
          on Pets Products!
        </h2>

        <NavLink to="/sales" className={styles.button}>
          Check out
        </NavLink>
      </div>
    </section>
  );
};

export default PromotionsSection;