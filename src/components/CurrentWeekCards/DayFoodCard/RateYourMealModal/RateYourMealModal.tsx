import { Dispatch, SetStateAction, useContext } from 'react';
import IconButton from '@/components/IconButton/IconButton';
import {
  Meal,
  MenuAndVendorsContext,
  MenuAndVendorsContextType,
  Vendor,
} from '@/context/MenuAndVendorsContext';
import Button from '@/components/button/Button';
import { ButtonSizes, ButtonVariants } from '@/components/button/Enum';
import DishInfo from './DishInfo/DishInfo';
import styles from './RateYourMealModal.module.scss';

interface Orders {
  day: string;
  orders: number[];
}

interface ModalProps {
  handleStateChange: Dispatch<SetStateAction<boolean>>;
  order: Orders;
}

function RateYourMealModal({ handleStateChange, order }: ModalProps) {
  const { meals, vendors } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);

  function handleSubmit(event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
    event.preventDefault();
    handleStateChange(false);
  }

  return (
    <div className={styles['window-container']}>
      <div className={styles['modal']}>
        <div className={styles['modal__header']}>
          <h3 className={styles['modal__title']}>Rate Your Meal</h3>
          <IconButton onClick={() => handleStateChange(false)} />
        </div>
        <p className={styles['modal__description']}>
          How do you rate your Monday, 23th of Jan meal?
        </p>
        <form className={styles['modal__rating-form']} onSubmit={handleSubmit}>
          {order.orders.map((orderId: number, index) => {
            const matchingMeal = meals.find((meal: Meal) => meal.id === orderId);
            if (!matchingMeal) {
              return null;
            }
            const matchingVendor = vendors.find(
              (vendor: Vendor) => vendor.id === matchingMeal.vendorId
            );
            if (!matchingVendor) {
              return null;
            }
            return (
              <DishInfo
                key={matchingMeal.id}
                matchingMeal={matchingMeal}
                matchingVendor={matchingVendor}
                containerIndex={index}
              />
            );
          })}
          <div className={styles['modal__buttons-container']}>
            <Button
              size={ButtonSizes.Medium}
              variant={ButtonVariants.Secondary}
              onClick={() => handleStateChange(false)}
              aria-label="cancel">
              Cancel
            </Button>
            <Button type="submit" size={ButtonSizes.Medium} aria-label="Send Your Review">
              Send Your Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RateYourMealModal;
