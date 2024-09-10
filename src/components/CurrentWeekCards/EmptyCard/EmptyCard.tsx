import LinkButton from '../LinkButton/LinkButton';
import styles from './EmptyCard.module.scss';

interface EmptyCardProps {
  day: string;
}

function EmptyCard({ day }: EmptyCardProps) {
  return (
    <div className={styles['card']}>
      <figure className={styles['card__figure']}>
        <img
          className={styles['card__icon']}
          src="/src/assets/icons/cart_placeholder_icon.png"
          alt="empty card"
        />
        <figcaption className={styles['card__text']}>You haven&apos;t ordered for {day}</figcaption>
      </figure>
      <div className={styles['card__button-container']}>
        <LinkButton text="View Menu" link="/food-menu" />
      </div>
    </div>
  );
}
export default EmptyCard;
