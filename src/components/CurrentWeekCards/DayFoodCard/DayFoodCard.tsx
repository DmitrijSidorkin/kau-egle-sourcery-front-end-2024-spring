import { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MenuAndVendorsContext, MenuAndVendorsContextType } from '@/context/MenuAndVendorsContext';
import Button from '@/components/button/Button';
import { ButtonSizes, ButtonVariants } from '@/components/button/Enum';
import calcWeekDayDate from '@/utils/calcWeekDayDate';
import giveAway from './utils/giveAway';
import { useAuth } from '@/context/AuthContext';
import { DayFoodCardProps } from './types';
import CancelConfirmationModal from './CancelConfirmationModal/CancelConfirmationModal';
import RateYourMealModal from './RateYourMealModal/RateYourMealModal';
import confirmedOrders from '../utils/confirmedOrders';
import OrderDetails from './OrderDetails/OrderDetails';
import { DayNames } from '../Enum';
import styles from './DayFoodCard.module.scss';

function DayFoodCard({ orders }: DayFoodCardProps) {
  const { meals } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [rateModalOpen, setRateModalOpen] = useState<boolean>(false);
  const {
    currentUserData,
    setCurrentUserData,
    setConfirmedOrdersArray,
    availableLunch,
    setAvailableLunch,
  } = useAuth();

  function pastCancelation(date: string) {
    const currentDate = new Date();
    return calcWeekDayDate(date) < currentDate;
  }

  function handleGiveAway() {
    const updatedAvailableLunch = giveAway(currentUserData, setCurrentUserData, availableLunch);
    setAvailableLunch(updatedAvailableLunch);
    setConfirmedOrdersArray(confirmedOrders(currentUserData));
    localStorage.setItem('availableLunch', JSON.stringify(updatedAvailableLunch));
  }

  return (
    <>
      {rateModalOpen && <RateYourMealModal handleStateChange={setRateModalOpen} order={orders} />}
      <div className={styles['card']}>
        <div className={styles['card__order-container']}>
          {orders.orders.map((order) => {
            const meal = meals.find((m) => m.id === order);
            if (!meal) return null;
            return <OrderDetails key={uuid()} meal={meal} day={orders.day} />;
          })}
        </div>
        <div className={styles['card__button-container']}>
          {orders.day === DayNames.Friday && (
            <Button
              size={ButtonSizes.XSmall}
              variant={ButtonVariants.Secondary}
              onClick={() => handleGiveAway()}
              aria-label="Give Away">
              <p>Give Away</p>
            </Button>
          )}
          {orders.day !== DayNames.Friday && pastCancelation(orders.day) && (
            <Button
              size={ButtonSizes.XSmall}
              variant={ButtonVariants.Secondary}
              onClick={() => setRateModalOpen(true)}
              aria-label="Rate Your Food">
              <p>Rate Your Food</p>
            </Button>
          )}
          {orders.day !== DayNames.Friday && !pastCancelation(orders.day) && (
            <Button
              size={ButtonSizes.XSmall}
              variant={ButtonVariants.Secondary}
              onClick={() => setCancelModalOpen(true)}
              aria-label="Cancel Order">
              <p>Cancel</p>
            </Button>
          )}
        </div>
      </div>
      {cancelModalOpen && (
        <CancelConfirmationModal handleStateChange={setCancelModalOpen} day={orders.day} />
      )}
    </>
  );
}
export default DayFoodCard;
