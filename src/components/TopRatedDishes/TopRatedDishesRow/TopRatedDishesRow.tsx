import { TopRatedDishesRowProps } from './typesDishesRow';
import Button from '@/components/button/Button';
import { ButtonSizes, ButtonVariants, IconPosition } from '@/components/button/Enum';
import { IconArrowForwardFilled } from '@/assets/icons';
import DisplayStarsRating from '@/components/DisplayStarsRating/DisplayStarsRating';
import { dishIcons } from '@/assets/icons/DishIcons';
import styles from './TopRatedDishesRow.module.scss';

function TopRatedDishesRow({ dish, vendor, mealRatings, onCommentsClick }: TopRatedDishesRowProps) {
  const vendFood = vendor.find((v) => v.id === dish.vendorId);
  const mealIcon = dishIcons[dish.dishType];

  return (
    <tr className={styles['ratings-row']}>
      <td className={styles['ratings-row__dish-box']}>
        <div className={styles['ratings-row__dish-box--container']}>
          <figure className={styles['ratings-row__dish-box--container-img']}>
            <img src={mealIcon} alt={dish.dishType} />
          </figure>
          <p className={styles['ratings-row__dish-box--container-p']}>{dish.title}</p>
        </div>
      </td>
      <td className={styles['ratings-row__vendor-box']}>
        <p className={styles['ratings-row__vendor-box--p']}>
          {vendFood ? vendFood.name : 'No Vendor data was found'}
        </p>
      </td>
      <td className={styles['ratings-row__rating-box']}>
        <div className={styles['ratings-row__rating-box--ratings']}>
          {!mealRatings.averageRating
            ? 'Dish has no ratings'
            : mealRatings.averageRating.toFixed(1)}
        </div>
        <div className={styles['ratings-row__rating-box--star-container']}>
          <DisplayStarsRating rating={mealRatings.averageRating} />
        </div>
        <div className={styles['ratings-row__rating-box--order-count']}>
          ({mealRatings.totalNrRatings})
        </div>
      </td>
      <td className={styles['ratings-row__vendor-box']}>
        <Button
          variant={ButtonVariants.Secondary}
          size={ButtonSizes.Small}
          icon={<IconArrowForwardFilled />}
          iconPosition={IconPosition.Right}
          onClick={onCommentsClick}>
          View Comments
        </Button>
      </td>
    </tr>
  );
}

export default TopRatedDishesRow;
