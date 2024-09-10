import { useContext, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MenuAndVendorsContext, MenuAndVendorsContextType } from '@/context/MenuAndVendorsContext';
import { LunchMenuContext, LunchMenuContextType } from '@/context/LunchMenuContext';
import IconButton from '../IconButton/IconButton';
import EmptyOrderList from './EmptyOrderList/EmptyOrderList';
import OrderList from './OrderList/OrderList';
import numberWithComma from '@/utils/numberWithComma';
import LunchOrderToast from './LunchOrderToast/LunchOrderToast';
import CheckoutButton from './CheckoutButton/CheckoutButton';
import { DayNames } from '../CurrentWeekCards/Enum';
import styles from './CartCard.module.scss';

function CartCard() {
  const { currentUserData } = useAuth();
  const { meals } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const { userOrder, setUserOrder, isCartEmpty, setIsCartEmpty, setIsCheckoutConfirmed } =
    useContext<LunchMenuContextType>(LunchMenuContext);
  const [orderToastOpen, setOrderToastOpen] = useState<boolean>(false);
  const [isCheckoutButtonPressed, setIsCheckoutButtonPressed] = useState(false);

  useEffect(() => {
    setIsCartEmpty(
      currentUserData.orders.length === 0 ||
        currentUserData.orders.findIndex((order) => order.weekDay === '') === 0
    );
    setUserOrder(currentUserData.orders);
  });
  function calculateTotalPrice() {
    let totalPrice = 0;

    userOrder.forEach((day) => {
      totalPrice +=
        day.mealIds?.reduce((sum, id) => {
          const matchingMeal = meals.find((meal) => meal.id === id);
          if (matchingMeal && day.weekDay !== DayNames.Friday) {
            return sum + matchingMeal.price;
          }
          return sum;
        }, 0) || 0;
    });
    return parseFloat(totalPrice.toFixed(2));
  }

  function closeCheckoutModal() {
    setOrderToastOpen(false);
    setIsCheckoutConfirmed(false);
    setIsCheckoutButtonPressed(false);
  }

  return (
    <div>
      {orderToastOpen && <LunchOrderToast handleStateChange={() => closeCheckoutModal()} />}
      <div className={styles['cart-card']}>
        <div className={styles['cart-card__card-top']}>
          <h3 className={styles['cart-card__header']}>Order Summary</h3>
          <IconButton />
        </div>
        <div className={styles['cart-card__order-list']}>
          {(isCartEmpty && <EmptyOrderList />) || <OrderList />}
        </div>
        <div className={styles['cart-card__checkout-box']}>
          <div className={styles['cart-card__price-container']}>
            <p className={styles['cart-card__price-text']}>Total Price</p>
            <p className={styles['cart-card__price']}>
              {String.fromCharCode(8364)}
              {numberWithComma(calculateTotalPrice())}
            </p>
          </div>
          <CheckoutButton
            handleToastState={setOrderToastOpen}
            isButtonPressed={isCheckoutButtonPressed}
            setIsButtonPressed={setIsCheckoutButtonPressed}
          />
        </div>
      </div>
    </div>
  );
}
export default CartCard;
