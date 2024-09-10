import { OrderHisMeal } from '../types';
import { Meal, Vendor } from '@/context/MenuAndVendorsContext';
import numberWithComma from '@/utils/numberWithComma';
import { getVendorName } from '@/utils/getVendorName';
import styles from './OrderHistoryRows.module.scss';

export interface OrderHistoryRowProps {
  order: OrderHisMeal;
  meals: Meal[];
  vendors: Vendor[];
}

function OrderHistoryRows({ order, meals, vendors }: OrderHistoryRowProps) {
  const orderedDishes = meals.filter((meal) => order.mealsIds?.includes(meal.id));

  if (orderedDishes.length === 0) {
    return (
      <tr className={styles['orders-row__no-container']}>
        <td colSpan={4} className={styles['orders-row__not-ordered']}>
          <p>You have not ordered anything yet</p>
        </td>
      </tr>
    );
  }

  const orderedDishesPrice = orderedDishes.reduce((acc, item) => acc + item.price, 0);

  const mainDish = orderedDishes.find((dish) => dish.mealType === 'main');
  const soupDish = orderedDishes.find((dish) => dish.mealType === 'soup');

  const mainDishVendor = getVendorName(vendors, mainDish);
  const soupDishVendor = getVendorName(vendors, soupDish);

  const dateDay = new Date(order.date as string).getDay();

  return (
    <tr className={styles['orders-row']}>
      <td className={styles['orders-row__date']}>
        <div className={styles['orders-row__date-container']}>
          <p>{new Date(order.date || '').toLocaleDateString('en-CA')}</p>
        </div>
      </td>
      <td className={styles['orders-row__summary']}>
        <div className={styles['orders-row__date-container']}>
          {mainDish && <p>{mainDish.title}</p>}
          {soupDish && <p>{soupDish.title}</p>}
        </div>
      </td>
      <td className={styles['orders-row__vendor']}>
        <div className={styles['orders-row__date-container']}>
          {mainDish && <p>{mainDishVendor}</p>}
          {soupDish && <p>{soupDishVendor}</p>}
        </div>
      </td>
      <td className={styles['orders-row__price']}>
        <div className={styles['orders-row__price-container']}>
          <p>
            {dateDay !== 5 ? (
              <span>{`${String.fromCharCode(8364)}${numberWithComma(Number(orderedDishesPrice.toFixed(2)))}`}</span>
            ) : (
              'Free'
            )}
          </p>
        </div>
      </td>
    </tr>
  );
}
export default OrderHistoryRows;
