import { Meal } from '@/context/MenuAndVendorsContext';

export interface OrderHisMeal {
  date: string | undefined;
  mealsIds: number[] | undefined;
  mealDetails: Meal[] | undefined;
  totalMealPrice: number;
  vendorCount: number;
  summary: string;
}
