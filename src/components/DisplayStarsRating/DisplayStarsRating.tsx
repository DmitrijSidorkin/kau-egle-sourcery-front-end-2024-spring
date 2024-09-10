import { v4 as uuid } from 'uuid';
import { EmptyStar, FilledStar, HalfFilledStar } from '@/assets/icons';

export interface StarRatingProps {
  rating: number | null;
}

function DisplayStarsRating({ rating }: StarRatingProps) {
  function roundRating(ratings: number | null) {
    if (ratings === null) {
      return null;
    }
    if (ratings % 1 >= 0.7) {
      return Math.ceil(ratings);
    }
    if (ratings % 1 >= 0.3) {
      return Math.floor(ratings) + 0.5;
    }
    return Math.floor(ratings);
  }

  const roundedRating = roundRating(rating);
  if (roundedRating === null) {
    return null;
  }

  const stars = [];
  for (let i = 0; i < 5; i += 1) {
    if (i < Math.floor(roundedRating)) {
      stars.push(FilledStar);
    } else if (i < roundedRating) {
      stars.push(HalfFilledStar);
    } else {
      stars.push(EmptyStar);
    }
  }

  return (
    <>
      {stars.map((Star) => (
        <Star key={uuid()} />
      ))}
    </>
  );
}
export default DisplayStarsRating;
