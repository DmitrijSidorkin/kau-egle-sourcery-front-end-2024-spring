/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { IconStar } from '@/assets/icons';
import { KeyboardKey } from './Enum';
import styles from './StarRatingSelect.module.scss';

interface StarRatingProps {
  containerIndex: number;
  rating: number[];
  setRating: Dispatch<SetStateAction<number[]>>;
}

function StarRatingSelect({ containerIndex, rating, setRating }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const totalStars = 5;

  function setStarRating(starValue: number, index: number) {
    const ratingCopy = [...rating];
    ratingCopy[index] = starValue;
    setRating(ratingCopy);
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLLabelElement>,
    starValue: number,
    index: number
  ) => {
    if (event.key === KeyboardKey.Enter || event.key === KeyboardKey.Space) {
      if (event.key === KeyboardKey.Space) {
        event.preventDefault();
      }
      setStarRating(starValue, index);
    }
  };

  return (
    <div className={styles['rating-stars']}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label
            className={styles['rating-stars__label']}
            key={starValue}
            htmlFor={`star_${starValue}`}
            aria-checked={rating[index] === starValue}
            aria-label={`${starValue} stars`}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setStarRating(starValue, containerIndex)}
            onKeyDown={(event) => handleKeyDown(event, starValue, containerIndex)}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}>
            <input
              className={styles['rating-stars__input']}
              id={`star_${starValue}`}
              type="radio"
              name="rating"
              value={starValue}
              checked={rating[index] === starValue}
              onChange={() => setStarRating(starValue, containerIndex)}
            />
            <div
              className={classNames(styles['rating-stars'], {
                [styles['rating-stars__filled']]: starValue <= (hover || rating[containerIndex]),
              })}>
              <IconStar />
            </div>
          </label>
        );
      })}
    </div>
  );
}
export default StarRatingSelect;
