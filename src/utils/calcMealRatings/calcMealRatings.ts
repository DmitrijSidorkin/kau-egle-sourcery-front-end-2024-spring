import { Rating } from '@/components/TopRatedDishes/types';

export interface MealRatingsProps {
  averageRating: number | null;
  totalNrRatings: number;
}

export function calcMealRatings(ratings: Rating[], mealId: number): MealRatingsProps {
  const filterMealRating = ratings.filter((rating) => rating.mealId === mealId);
  const totalRatings = filterMealRating.length;

  if (totalRatings === 0) {
    return {
      averageRating: null,
      totalNrRatings: 0,
    };
  }
  const sumAllMealRatings = filterMealRating.reduce((sum, rating) => sum + rating.rating.rating, 0);
  const ratingsAverage = sumAllMealRatings / totalRatings;

  return {
    averageRating: ratingsAverage,
    totalNrRatings: totalRatings,
  };
}
