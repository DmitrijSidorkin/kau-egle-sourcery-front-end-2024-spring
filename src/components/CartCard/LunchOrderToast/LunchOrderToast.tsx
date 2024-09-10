import { ThumbsUpIcon } from '@/assets/icons';
import IconButton from '@/components/IconButton/IconButton';
import Button from '@/components/button/Button';
import { ButtonSizes } from '@/components/button/Enum';
import styles from './LunchOrderToast.module.scss';

interface ToastProps {
  handleStateChange: () => void;
}

function LunchOrderToast({ handleStateChange }: ToastProps) {
  return (
    <div className={styles['window-container']}>
      <div className={styles.toast}>
        <div className={styles.toast__content}>
          <div className={styles.toast__header}>
            <h3 className={styles['toast__header-text']}>We&apos;ve got your lunch order!</h3>
            <IconButton onClick={() => handleStateChange()} aria-label="close" />
          </div>
          <div className={styles.toast__message}>
            <ThumbsUpIcon />

            <p className={styles['toast__message-text']}>
              Your order is placed successfully.
              <br /> You can view your lunch for the week in
              <br />
              <span className={styles['toast__your-order']}>Your Order.</span>
            </p>
          </div>
        </div>
        <div className={styles['toast__button-container']}>
          <Button size={ButtonSizes.Medium} onClick={() => handleStateChange()}>
            Cool, Thanks!
          </Button>
        </div>
      </div>
    </div>
  );
}
export default LunchOrderToast;
