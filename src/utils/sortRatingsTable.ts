import { Meal, Rating, Vendor } from '@/components/TopRatedDishes/types';
import { MealRatingsProps } from './calcMealRatings/calcMealRatings';
import { OrderHisMeal } from '@/components/OrderHistoryTable/OrderHistoryTable/types';

export type ValuesOfSort = string | number | boolean | string[] | Date;

export function sortRatingsTable(
  meals: Meal[],
  vendors: Vendor[],
  ratings: Rating[],
  input: string,
  order: string,
  calcMealRatings: (ratings: Rating[], mealId: number) => number | MealRatingsProps
) {
  return [...meals].sort((a, b) => {
    let aValue: ValuesOfSort;
    let bValue: ValuesOfSort;

    if (input === 'Vendor') {
      const aVendor = vendors.find((vendor) => vendor.id === a.vendorId);
      const bVendor = vendors.find((vendor) => vendor.id === b.vendorId);
      aValue = aVendor ? aVendor.name : '';
      bValue = bVendor ? bVendor.name : '';
    } else if (input === 'Rating') {
      const aRating = calcMealRatings(ratings, a.id) as MealRatingsProps;
      const bRating = calcMealRatings(ratings, b.id) as MealRatingsProps;
      aValue = aRating.averageRating !== null ? aRating.averageRating : 0;
      bValue = bRating.averageRating !== null ? bRating.averageRating : 0;
      if (aValue === bValue) {
        return aRating.totalNrRatings > bRating.totalNrRatings ? -1 : 1;
      }
    } else if (input === 'Title') {
      aValue = a.title;
      bValue = b.title;
    } else {
      aValue = a[input as keyof Meal];
      bValue = b[input as keyof Meal];
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;

    return 0;
  });
}

export function sortHistoryTable(
  orderHistoryMealsArray: OrderHisMeal[],
  input: string,
  order: string
) {
  return [...orderHistoryMealsArray].sort((a, b) => {
    let aValue: ValuesOfSort = '';
    let bValue: ValuesOfSort = '';

    if (input === 'vendor') {
      aValue = a.vendorCount;
      bValue = b.vendorCount;
    } else if (input === 'price') {
      aValue = a.totalMealPrice;
      bValue = b.totalMealPrice;
    } else if (input === 'date') {
      aValue = new Date(a.date || '');
      bValue = new Date(b.date || '');
    } else if (input === 'summary') {
      aValue = (a.mealDetails?.map((meal) => meal.title) ?? []).join(' ');
      bValue = (b.mealDetails?.map((meal) => meal.title) ?? []).join(' ');
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;

    return 0;
  });
}

export function sortSummaryByType(mealDetails: Meal[]) {
  return mealDetails
    .sort((a, b) => {
      if (a.mealType === 'main' && b.mealType !== 'main') {
        return -1;
      }
      if (a.mealType !== 'main' && b.mealType === 'main') {
        return 1;
      }
      return a.title.localeCompare(b.title);
    })
    .map((m) => m.title)
    .join(' ');
}
