import { Dispatch, SetStateAction } from 'react';
import { ButtonSizes, ButtonVariants } from '@/components/button/Enum';
import Button from '@/components/button/Button';
import IconButton from '@/components/IconButton/IconButton';
import { QuestionMarkIcon } from '@/assets/icons';
import cancelOrder from '../utils/cancelOrder';
import { useAuth } from '@/context/AuthContext';
import confirmedOrders from '../../utils/confirmedOrders';
import styles from './CancelConfirmationModal.module.scss';

interface ModalProps {
  handleStateChange: Dispatch<SetStateAction<boolean>>;
  day: string;
}

function CancelConfirmationModal({ handleStateChange, day }: ModalProps) {
  const { currentUserData, setCurrentUserData, setConfirmedOrdersArray } = useAuth();
  return (
    <dialog className={styles['window-container']}>
      <div className={styles['modal']}>
        <div className={styles['modal__content']}>
          <div className={styles['modal__header']}>
            <h3 className={styles['modal__header-text']}>
              You&apos;re about to cancel your order.
            </h3>
            <IconButton onClick={() => handleStateChange(false)} aria-label="close" />
          </div>
          <div className={styles['modal__message']}>
            <figure className={styles['modal__svg-container']}>
              <QuestionMarkIcon />
            </figure>
            <p className={styles['modal__message-text']}>
              Are you sure you want to cancel your order for {day}?
            </p>
          </div>
        </div>
        <div className={styles['modal__button-container']}>
          <Button
            size={ButtonSizes.Medium}
            variant={ButtonVariants.Secondary}
            onClick={() => handleStateChange(false)}
            aria-label="keep order">
            No, Keep
          </Button>
          <Button
            size={ButtonSizes.Medium}
            onClick={() => {
              cancelOrder(currentUserData, setCurrentUserData, day);
              handleStateChange(false);
              setConfirmedOrdersArray(confirmedOrders(currentUserData));
            }}
            aria-label="cancel order">
            Yes, Cancel
          </Button>
        </div>
      </div>
    </dialog>
  );
}

export default CancelConfirmationModal;
