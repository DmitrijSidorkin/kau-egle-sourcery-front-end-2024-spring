import { useContext } from 'react';
import { calcMealRatings } from '@/utils/calcMealRatings/calcMealRatings';
import Button from '@/components/button/Button';
import IconButton from '@/components/IconButton/IconButton';
import { ButtonSizes, ButtonVariants } from '@/components/button/Enum';
import {
  Meal,
  MenuAndVendorsContext,
  MenuAndVendorsContextType,
} from '@/context/MenuAndVendorsContext';
import DisplayStarsRating from '@/components/DisplayStarsRating/DisplayStarsRating';
import Comments from '@/components/Comments/Comments';
import { IconChilli, IconPlant } from '@/assets/icons';
import { dishIcons } from '@/assets/icons/DishIcons';
import numberWithComma from '@/utils/numberWithComma';
import { DayNames } from '@/components/CurrentWeekCards/Enum';
import styles from './DishDetails.module.scss';

interface DishDetailsProps {
  handleCloseModal: () => void;
  addToCart: () => void;
  meal: Meal;
  addToCartDisabled: boolean;
  day: string;
}

function DishDetails({
  handleCloseModal,
  addToCart,
  meal,
  addToCartDisabled,
  day,
}: DishDetailsProps) {
  const { vendors, ratings } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const vendorName = vendors[vendors.findIndex((vendor) => vendor.id === meal.vendorId)].name;
  const mealRating = calcMealRatings(ratings, meal.id).averageRating;

  return (
    <div className={styles['window-container']}>
      <div className={styles['dish-details']}>
        <div className={styles['dish-details__dish-container']}>
          <div className={styles['dish-details__header']}>
            <h3 className={styles['dish-details__header-text']}>Dish Details</h3>
            <IconButton onClick={() => handleCloseModal()} aria-label="close" />
          </div>
          <div className={styles['dish-details__dish']}>
            <div className={styles['dish-details__icon-background']}>
              <figure>
                <img src={dishIcons[meal.dishType]} alt={meal.dishType} />
              </figure>
            </div>
            <div className={styles['dish-details__dish-info']}>
              <div className={styles['dish-details__main-info']}>
                <p className={styles['dish-details__vendor']}>{vendorName}</p>
                <div className={styles['dish-details__dish-title']}>
                  <p className={styles['dish-details__dish-name']}>
                    {meal.title}
                    <span className={styles['dish-details__dish-type-icons']}>
                      {meal.vegetarian && (
                        <figure
                          className={`${styles['dish-details__dish-icon']} ${styles['dish-details__dish-icon--plant']}`}>
                          <IconPlant />
                        </figure>
                      )}
                    </span>
                    <span className={styles['dish-details__dish-type-icons']}>
                      {meal.spicy && (
                        <figure
                          className={`${styles['dish-details__dish-icon']} ${styles['dish-details__dish-icon--chilli']}`}>
                          <IconChilli />
                        </figure>
                      )}
                    </span>
                  </p>
                </div>
                <div className={styles['dish-details__stars-container']}>
                  <DisplayStarsRating rating={mealRating || 0} />
                </div>
                <p className={styles['dish-details__rating']}>
                  {mealRating ? mealRating?.toFixed(1) : 'Dish has no rating'}
                </p>
              </div>
              <div className={styles['dish-details__description-and-price']}>
                <p className={styles['dish-details__dish-description']}>{meal.description}</p>
                <div className={styles['dish-details__price-container']}>
                  <p className={styles['dish-details__price-title']}>Price</p>
                  <p className={styles['dish-details__price']}>
                    {day !== DayNames.Friday ? (
                      <span>{`${String.fromCharCode(8364)}${numberWithComma(Number(meal.price.toFixed(2)))}`}</span>
                    ) : (
                      'Free'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['dish-details__line']} />
        <div className={styles['dish-details__comments']}>
          <Comments ratings={ratings} mealId={meal.id} />
        </div>
        <div className={styles['dish-details__buttons']}>
          <div className={styles['dish-details__button-container']}>
            <Button
              variant={ButtonVariants.Secondary}
              size={ButtonSizes.Medium}
              onClick={() => handleCloseModal()}
              aria-label="Close">
              Close
            </Button>
            <Button
              size={ButtonSizes.Medium}
              type="submit"
              onClick={() => {
                addToCart();
                handleCloseModal();
              }}
              disabled={addToCartDisabled}
              aria-label="Add to cart">
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DishDetails;
