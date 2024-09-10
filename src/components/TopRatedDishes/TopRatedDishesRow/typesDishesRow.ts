import { MealRatingsProps } from '@/utils/calcMealRatings/calcMealRatings';
import { Vendor, Meal } from '../types';

export interface TopRatedDishesRowProps {
  vendor: Vendor[];
  dish: Meal;
  mealRatings: MealRatingsProps;
  onCommentsClick: () => void;
}
