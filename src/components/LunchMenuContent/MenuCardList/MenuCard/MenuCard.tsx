import { useContext, useState } from 'react';
import { MenuAndVendorsContext, MenuAndVendorsContextType } from '@/context/MenuAndVendorsContext';
import { LunchMenuContext, LunchMenuContextType } from '@/context/LunchMenuContext';
import {
  IconAddFilled,
  IconArrowForwardFilled,
  IconChilli,
  IconPlant,
  IconStar,
} from '@/assets/icons';
import { dishIcons } from '@/assets/icons/DishIcons';
import DishDetails from './DishDetails/DishDetails';
import { PropsMenuCard } from './types';
import Button from '@/components/button/Button';
import { ButtonSizes, ButtonVariants, IconPosition } from '@/components/button/Enum';
import { updateUserData } from '@/utils/updateUserData';
import numberWithComma from '@/utils/numberWithComma';
import { calcMealRatings } from '@/utils/calcMealRatings/calcMealRatings';
import setCurrentUserWeekOrders from '@/utils/setCurrentUserWeekOrders';
import { useAuth } from '@/context/AuthContext';
import { DayNames } from '@/components/CurrentWeekCards/Enum';
import styles from './MenuCard.module.scss';

function MenuCard({ meal, handleToastState, handleToastMealName, currentUserData }: PropsMenuCard) {
  const { currentTab, setUserOrder } = useContext<LunchMenuContextType>(LunchMenuContext);
  const { vendors, ratings, meals } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const [isDishDetailsOpen, setIsDishDetailsOpen] = useState<boolean>(false);
  const { setOrderedThisWeek, setCurrentUserData, orderedThisWeek } = useAuth();
  const handleOpenDetails = () => {
    setIsDishDetailsOpen(true);
  };
  const handleCloseDetails = () => {
    setIsDishDetailsOpen(false);
  };
  const mealRating = calcMealRatings(ratings, meal.id);
  const mealTypeOrdered: string[] = [];
  const weekOrderDayIndex = orderedThisWeek.findIndex((order) => order.day === currentTab);
  const orderDayIndex = currentUserData.orders.findIndex((order) => order.weekDay === currentTab);

  if (weekOrderDayIndex >= 0) {
    orderedThisWeek[weekOrderDayIndex].orders.forEach((mealId) => {
      const matchingMealType = meals.find((m) => m.id === mealId)?.mealType;

      if (matchingMealType) {
        mealTypeOrdered.push(matchingMealType);
      }
    });
  }

  const mealTypeAlreadyOrdered = mealTypeOrdered.indexOf(meal.mealType) >= 0;

  const addToCart = () => {
    const updatedUserData = currentUserData;
    if (mealTypeAlreadyOrdered) {
      return;
    }
    if (updatedUserData.orders.length === 0) {
      updatedUserData.orders[0] = { weekDay: currentTab, mealIds: [meal.id] };
    } else if (orderDayIndex >= 0) {
      updatedUserData.orders[orderDayIndex].mealIds?.push(meal.id);
    } else if (updatedUserData.orders[0].weekDay === '') {
      updatedUserData.orders[0] = { weekDay: currentTab, mealIds: [meal.id] };
    } else {
      updatedUserData.orders.push({ weekDay: currentTab, mealIds: [meal.id] });
    }
    handleToastState(true);
    handleToastMealName(meal.title);

    setUserOrder((prevUserOrder) => {
      const updatedUserOrder = [...prevUserOrder];
      return updatedUserOrder;
    });
    updateUserData({ currentUser: currentUserData.userName, updatedUserData });
    setCurrentUserWeekOrders(currentUserData.userName, setOrderedThisWeek, setCurrentUserData);
  };

  return (
    <>
      <div
        className={`${styles['menu-card']} ${mealTypeAlreadyOrdered ? styles['menu-card--disabled'] : ''}`}
        key={meal.id}>
        <div className={styles['menu-card__heading-block']}>
          <div className={styles['menu-card__heading-first']}>
            <figure className={styles['menu-card__heading-img']}>
              <img src={dishIcons[meal.dishType]} alt={meal.dishType} />
            </figure>
          </div>
          <div className={styles['menu-card__heading-second']}>
            <h2 className={styles['menu-card__vendor-name']}>{vendors[meal.vendorId - 1].name}</h2>
            <h3 className={styles['menu-card__meal-title']}>{meal.title}</h3>
            <div className={styles['menu-card__meal-icons']}>
              {meal.vegetarian && (
                <figure
                  className={`${styles['menu-card__meal-icons']} ${styles['menu-card__meal-icons--plant']}`}>
                  <IconPlant />
                </figure>
              )}
              {meal.spicy && (
                <figure
                  className={`${styles['menu-card__meal-icons']} ${styles['menu-card__meal-icons--chilli']}`}>
                  <IconChilli />
                </figure>
              )}
            </div>
          </div>
        </div>
        <div className={styles['menu-card__body-block']}>
          <div className={styles['menu-card__meal-description']}>
            <p>{meal.description}</p>
          </div>
          <div className={styles['menu-card__meal-rating']}>
            <figure className={styles['menu-card__img-flow']}>
              <IconStar />
              <figcaption className={styles['menu-card__rating-text']}>
                {mealRating?.averageRating?.toFixed(1) || '-'}
              </figcaption>
            </figure>
            <Button
              type="button"
              variant={ButtonVariants.Tertiary}
              size={ButtonSizes.Small}
              icon={<IconArrowForwardFilled />}
              iconPosition={IconPosition.Right}
              onClick={() => handleOpenDetails()}
              aria-label="Show more info about item">
              More Info
            </Button>
          </div>
        </div>
        <div className={styles['menu-card__footer']}>
          <div>
            <p className={styles['menu-card__price-text']}>Price</p>
            <p className={styles['menu-card__meal-price']}>
              {currentTab !== DayNames.Friday ? (
                <span>{`${String.fromCharCode(8364)}${numberWithComma(Number(meal.price.toFixed(2)))}`}</span>
              ) : (
                'Free'
              )}
            </p>
          </div>
          <div className={styles['menu-card__button-container']}>
            <Button
              type="button"
              variant={ButtonVariants.Secondary}
              size={ButtonSizes.Small}
              icon={<IconAddFilled />}
              aria-label={`Add ${meal.title} to your cart`}
              onClick={addToCart}
              disabled={mealTypeAlreadyOrdered}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      {isDishDetailsOpen && (
        <DishDetails
          handleCloseModal={handleCloseDetails}
          addToCart={addToCart}
          meal={meal}
          addToCartDisabled={mealTypeAlreadyOrdered}
          day={currentTab}
        />
      )}
    </>
  );
}

export default MenuCard;
