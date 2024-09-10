import LinkButton from '../LinkButton/LinkButton';
import { AlarmClockIcon } from '@/assets/icons';
import styles from './TooLateCard.module.scss';

function TooLateCard() {
  return (
    <div className={styles['card']}>
      <figure className={styles['card__figure']}>
        <div className={styles['card__icon-container']}>
          <AlarmClockIcon />
        </div>
        <figcaption className={styles['card__text']}>
          Dang, it&apos;s too late to order Free food. :&#40;
        </figcaption>
      </figure>
      <div className={styles['card__button-container']}>
        <LinkButton text="View Available Lunch" link="/available-lunch" />
      </div>
    </div>
  );
}
export default TooLateCard;
