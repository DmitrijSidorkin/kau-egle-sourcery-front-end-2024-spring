import { dishIcons } from '@/assets/icons/DishIcons';
import { Meal, Vendor } from '@/context/MenuAndVendorsContext';
import styles from './ReserverdMealDetails.module.scss';

interface MealDetails {
  meal: Meal | undefined;
  vendFood: Vendor | null | undefined;
  mealId: number;
}
interface DetailProps {
  detail: MealDetails;
}

function ReservedMealDetails({ detail }: DetailProps) {
  return (
    <div key={detail.mealId} className={styles['meal-details__meal-container']}>
      <div className={styles['meal-details__dish-icon-container']}>
        {detail.meal && (
          <figure className={styles['meal-details__dish-icon']}>
            <img
              className={styles['meal-details__dish-icon-image']}
              src={dishIcons[detail.meal.dishType] || ''}
              alt={detail.meal.dishType}
            />
          </figure>
        )}
      </div>
      <div className={styles['meal-details__meal-info-container']}>
        {detail.vendFood && (
          <p className={styles['meal-details__vendor-name']}>
            {detail.vendFood.name.toUpperCase()}
          </p>
        )}
        {detail.meal && <p className={styles['meal-details__meal-name']}>{detail.meal.title}</p>}
      </div>
    </div>
  );
}
export default ReservedMealDetails;
