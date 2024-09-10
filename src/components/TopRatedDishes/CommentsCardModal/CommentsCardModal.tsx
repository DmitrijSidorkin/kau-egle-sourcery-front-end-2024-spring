import { useContext } from 'react';
import IconButton from '@/components/IconButton/IconButton';
import { Size, Variant } from '@/components/IconButton/Enums';
import { dishIcons } from '@/assets/icons/DishIcons';
import { Vendor, Meal } from '../types';
import DisplayStarsRating from '@/components/DisplayStarsRating/DisplayStarsRating';
import { MealRatingsProps } from '@/utils/calcMealRatings/calcMealRatings';
import Button from '@/components/button/Button';
import { ButtonSizes } from '@/components/button/Enum';
import { IconChilli, IconPlant } from '@/assets/icons';
import Comments from '@/components/Comments/Comments';
import { MenuAndVendorsContext, MenuAndVendorsContextType } from '@/context/MenuAndVendorsContext';
import styles from './CommentsCardModal.module.scss';

type CommentsCardModalProps = {
  onClose: () => void;
  vendor: Vendor[];
  dish: Meal;
  mealRatings: MealRatingsProps;
};

function CommentsCardModal({ vendor, dish, onClose, mealRatings }: CommentsCardModalProps) {
  const { ratings } = useContext<MenuAndVendorsContextType>(MenuAndVendorsContext);
  const vendFood = vendor.find((v) => v.id === dish.vendorId);
  const mealIcon = dishIcons[dish.dishType];
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <div className={styles['modal__header-top']}>
            <div className={styles['modal__header-top-title']}>
              <p>Comments</p>
            </div>
            <div className={styles['modal__header-top-close']}>
              <IconButton
                variant={Variant.TERTIARY}
                size={Size.MEDIUM}
                onClick={() => onClose()}
                aria-label="close"
              />
            </div>
          </div>
          <div className={styles['modal__header-bottom']}>
            <figure className={styles['modal__header-bottom-img']}>
              <img src={mealIcon} alt={dish.dishType} />
            </figure>
            <div className={styles['modal__header-bottom-title']}>
              <div className={styles['modal__header-bottom-vendor']}>
                <p>{vendFood?.name}</p>
              </div>
              <div className={styles['modal__header-bottom-name']}>
                <p>{dish.title}</p>
                <div className={styles['modal__header-botom-icons']}>
                  {dish.vegetarian && (
                    <figure
                      className={`${styles['modal__header-botom-icon']} ${styles['modal__header-botom-icon--plant']}`}>
                      <IconPlant />
                    </figure>
                  )}
                  {dish.spicy && (
                    <figure
                      className={`${styles['modal__header-botom-icon']} ${styles['modal__header-botom-icon--chilli']}`}>
                      <IconChilli />
                    </figure>
                  )}
                </div>
              </div>
              <div className={styles['modal__header-botom-rating']}>
                <DisplayStarsRating rating={mealRatings.averageRating} />
              </div>
              <div className={styles['modal__header-bottom-total']}>
                {mealRatings.averageRating
                  ? mealRatings.averageRating?.toFixed(1)
                  : 'Dish has no rating'}
              </div>
            </div>
          </div>
        </div>
        <div className={styles['modal__mid-line']} />
        <div className={styles['modal__mid-comments']}>
          <Comments ratings={ratings} mealId={dish.id} displayStars />
        </div>
        <div className={styles['modal__bottom-button']}>
          <Button
            size={ButtonSizes.Medium}
            type="button"
            onClick={() => {
              onClose();
            }}
            aria-label="Close card">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CommentsCardModal;
