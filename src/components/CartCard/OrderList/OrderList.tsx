import { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import {
  Meal,
  MenuAndVendorsContext,
  MenuAndVendorsContextType,
} from '@/context/MenuAndVendorsContext';
import { LunchMenuContext, LunchMenuContextType } from '@/context/LunchMenuContext';
import { useAuth } from '@/context/AuthContext';
import { RemoveItemIcon } from '@/assets/icons';
import { dishIcons } from '@/assets/icons/DishIcons';
import numberWithComma from '@/utils/numberWithComma';
import IconButton from '@/components/IconButton/IconButton';
import { Size, Variant } from '@/components/IconButton/Enums';
import setCurrentUserWeekOrders from '@/utils/setCurrentUserWeekOrders';
import { updateUserData } from '@/utils/updateUserData';
import { DayNames } from '@/components/CurrentWeekCards/Enum';
import styles from './OrderList.module.scss';

function OrderList() {
  const { meals, vendors } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const { userOrder, setUserOrder, setIsCartEmpty } =
    useContext<LunchMenuContextType>(LunchMenuContext);
  const { currentUserData, setOrderedThisWeek, setCurrentUserData } = useAuth();
  const dayNames = Object.values(DayNames);

  function removeItemFromCart(day: number, item: number) {
    let userOrderCopy = [...userOrder];
    if (userOrderCopy[day].mealIds?.length === 1 && item === 0) {
      userOrderCopy = [
        ...(userOrderCopy.slice(0, day) || []),
        ...(userOrderCopy.slice(day + 1) || []),
      ];
    } else {
      userOrderCopy[day] = {
        ...userOrderCopy[day],
        mealIds: [
          ...(userOrderCopy[day].mealIds?.slice(0, item) || []),
          ...(userOrderCopy[day].mealIds?.slice(item + 1) || []),
        ],
      };
    }
    const updatedUserData = currentUserData;
    updatedUserData.orders = userOrderCopy;
    updateUserData({ currentUser: currentUserData.userName, updatedUserData });
    setIsCartEmpty(userOrderCopy.length === 0 || userOrderCopy[0].weekDay === '');
    setUserOrder(userOrderCopy);
    setCurrentUserWeekOrders(currentUserData.userName, setOrderedThisWeek, setCurrentUserData);
  }

  return (
    <div className={styles['order-list']}>
      {dayNames.map((day) =>
        userOrder.map((order, dayIndex) => {
          if (order.weekDay === day) {
            return (
              <div key={uuid()} className={styles['order-list__day-container']}>
                <div className={styles['order-list__day-header']}>
                  <h3 className={styles['order-list__day-title']}>{day}</h3>
                  <div className={styles['order-list__header-line']} />
                </div>
                <div className={styles['order-list__day-list']}>
                  {order.mealIds
                    ?.reduce<Meal[]>((acc, mealId) => {
                      const matchedMeal = meals.find((meal) => meal.id === mealId);
                      if (matchedMeal) {
                        acc.push(matchedMeal);
                      }
                      return acc;
                    }, [])
                    .map((matchedMeal, mealIndex) => {
                      const mealVendor = vendors.find(
                        (vendor) => vendor.id === matchedMeal.vendorId
                      );
                      return (
                        <div key={uuid()} className={styles['order-list__order-item']}>
                          <div className={styles['order-list__item-icon']}>
                            <img src={dishIcons[matchedMeal.dishType]} alt={matchedMeal.dishType} />
                          </div>
                          <div className={styles['order-list__item-details']}>
                            <h4 className={styles['order-list__vendor-name']}>
                              {mealVendor?.name}
                            </h4>
                            <div className={styles['order-list__dish-info']}>
                              <p className={styles['order-list__dish-name']}>{matchedMeal.title}</p>
                              <div className={styles['order-list__price-container']}>
                                <p className={styles['order-list__price']}>
                                  {day !== DayNames.Friday ? (
                                    <span>{`${String.fromCharCode(8364)}${numberWithComma(Number(matchedMeal.price.toFixed(2)))}`}</span>
                                  ) : (
                                    'Free'
                                  )}
                                </p>
                                <div className={styles['order-list__remove-dish']}>
                                  <IconButton
                                    size={Size.SMALL}
                                    variant={Variant.TERTIARY}
                                    icon={<RemoveItemIcon />}
                                    onClick={() => removeItemFromCart(dayIndex, mealIndex)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          }
          return null;
        })
      )}
      <div className={styles['order-list__line']} />
    </div>
  );
}
export default OrderList;
