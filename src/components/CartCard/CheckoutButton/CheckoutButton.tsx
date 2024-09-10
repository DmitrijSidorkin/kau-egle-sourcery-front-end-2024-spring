import { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import { CheckCircle } from '@/assets/icons';
import { LunchMenuContext, LunchMenuContextType } from '@/context/LunchMenuContext';
import { OrderHistory, useAuth } from '@/context/AuthContext';
import addDateToOrders from '@/utils/addDateToOrders';
import { updateUserData } from '@/utils/updateUserData';
import setCurrentUserWeekOrders from '@/utils/setCurrentUserWeekOrders';
import styles from './CheckoutButton.module.scss';

interface CheckoutProps {
  handleToastState: Dispatch<SetStateAction<boolean>>;
  isButtonPressed: boolean;
  setIsButtonPressed: Dispatch<SetStateAction<boolean>>;
}

function CheckoutButton({ handleToastState, isButtonPressed, setIsButtonPressed }: CheckoutProps) {
  const { isCartEmpty, setUserOrder, setIsCartEmpty, isCheckoutConfirmed, setIsCheckoutConfirmed } =
    useContext<LunchMenuContextType>(LunchMenuContext);
  const { currentUserData, setCurrentUserData, setOrderedThisWeek } = useAuth();
  function orderCheckout() {
    setCurrentUserWeekOrders(
      currentUserData.userName,
      setOrderedThisWeek,
      setCurrentUserData,
      true
    );
    const modifiedOrderData = addDateToOrders(currentUserData.orders);
    const modifiedUserData = JSON.parse(JSON.stringify(currentUserData));
    modifiedOrderData.forEach((order, orderIndex) => {
      modifiedUserData.orderHistory.forEach((oldOrder: OrderHistory) => {
        if (order.mealsIds && oldOrder.mealsIds && oldOrder.date === order.date) {
          oldOrder.mealsIds.push(order.mealsIds[0]);
          modifiedOrderData.splice(orderIndex, 1);
        }
      });
    });
    modifiedUserData.orderHistory = [
      ...(modifiedUserData.orderHistory ?? []),
      ...modifiedOrderData,
    ];
    modifiedUserData.orders = [];
    modifiedUserData.orderHistory = modifiedUserData.orderHistory?.filter(
      (order: OrderHistory) => order.date !== ''
    );
    setCurrentUserData(modifiedUserData);
    updateUserData({ currentUser: currentUserData.userName, updatedUserData: modifiedUserData });
    setUserOrder([]);
    setIsCartEmpty(false);
    handleToastState(true);
  }

  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (isButtonPressed) {
      timerRef.current = window.setTimeout(() => {
        setIsCheckoutConfirmed(true);
        orderCheckout();
      }, 1000);
    } else {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      setIsCheckoutConfirmed(false);
    }
  }, [isButtonPressed]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsButtonPressed(true);
    }
  };

  const handleMouseDown = () => {
    setIsButtonPressed(true);
  };

  const handleMouseUp = () => {
    if (!isCheckoutConfirmed) {
      setIsButtonPressed(false);
    }
  };

  const handleKeyUp = () => {
    if (!isCheckoutConfirmed) {
      setIsButtonPressed(false);
    }
  };

  return (
    <button
      type="button"
      disabled={isCartEmpty}
      className={`${styles['checkout-button']} ${isButtonPressed ? styles['checkout-button__button-pressed'] : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onKeyDown={handleKeyPress}
      onKeyUp={handleKeyUp}
      aria-label="Press and hold Enter to order">
      <span className={styles['checkout-button__span-element']}>
        {isCheckoutConfirmed ? (
          <div className={styles['checkout-button__div-confirmed']}>
            <p>Confirmed!</p>
            <div className={styles['checkout-button__icon-container']}>
              <div className={styles['checkout-button__inner-container']}>
                <CheckCircle />
              </div>
            </div>
          </div>
        ) : (
          'Press and Hold to send'
        )}
      </span>
    </button>
  );
}
export default CheckoutButton;
