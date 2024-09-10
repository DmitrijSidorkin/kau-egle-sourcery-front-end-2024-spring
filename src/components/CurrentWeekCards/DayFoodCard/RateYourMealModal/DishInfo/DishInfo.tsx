import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { dishIcons } from '@/assets/icons/DishIcons';
import StarRatingSelect from '../StarRatingSelect/StarRatingSelect';
import { Meal, Vendor } from '@/context/MenuAndVendorsContext';
import styles from './DishInfo.module.scss';

interface DishInfoProps {
  matchingMeal: Meal;
  matchingVendor: Vendor;
  containerIndex: number;
}

function DishInfo({ matchingMeal, matchingVendor, containerIndex }: DishInfoProps) {
  const [rating, setRating] = useState([0, 0]);

  return (
    <div className={styles['dish-info__rating-details']} key={matchingMeal.id}>
      <div className={styles['dish-info__vendor-div']}>
        <p className={styles['dish-info__vendor']}>{matchingVendor.name}</p>
        <div className={styles['dish-info__line']} />
      </div>
      <div className={styles['dish-info__dish']}>
        <figure className={styles['dish-info__icon-container']}>
          <img src={dishIcons[matchingMeal.dishType]} alt="dish type" />
        </figure>
        <p className={styles['dish-info__dish-name']}>{matchingMeal.title}</p>
      </div>
      <div className={styles['dish-info__dish-rating']}>
        <p className={styles['dish-info__rating-title']}>Give a rating to this dish</p>
        <div className={styles['dish-info__rating']}>
          <StarRatingSelect
            key={uuid()}
            containerIndex={containerIndex}
            rating={rating}
            setRating={setRating}
          />
        </div>
      </div>
      <div className={styles['dish-info__rating-comment']}>
        <p className={styles['dish-info__comment-title']}>Leave a comment</p>
        <textarea
          className={styles['dish-info__comment']}
          placeholder="Type your comment here"
          aria-label="Type your comment here"
        />
      </div>
    </div>
  );
}
export default DishInfo;
