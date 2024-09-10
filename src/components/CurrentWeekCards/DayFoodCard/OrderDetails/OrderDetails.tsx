import { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { dishIcons } from '@/assets/icons/DishIcons';
import {
  Meal,
  MenuAndVendorsContext,
  MenuAndVendorsContextType,
} from '@/context/MenuAndVendorsContext';
import numberWithComma from '@/utils/numberWithComma';
import { DayNames } from '../../Enum';
import styles from './OrderDetails.module.scss';

interface DetailsProps {
  meal: Meal;
  day: string;
}

function OrderDetails({ meal, day }: DetailsProps) {
  const { vendors } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const matchingVendor = vendors.find((vendor) => vendor.id === meal.vendorId);

  return (
    <div key={uuid()} className={styles['order-details']}>
      <figure className={styles['order-details__image-container']}>
        <img className={styles.card__image} src={dishIcons[meal.dishType]} alt={meal.dishType} />
      </figure>
      <div className={styles['order-details__order-text']}>
        {matchingVendor && <p className={styles['order-details__vendor']}>{matchingVendor.name}</p>}
        <div className={styles['order-details__dish-info']}>
          <p className={styles['order-details__title']}>{meal.title}</p>
          <p className={styles['order-details__price']}>
            {day === DayNames.Friday ? 'Free' : `€${numberWithComma(meal.price)}`}
          </p>
        </div>
      </div>
    </div>
  );
}
export default OrderDetails;
