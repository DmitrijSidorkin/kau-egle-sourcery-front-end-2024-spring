import { Vendor, Meal, Rating } from '../types';

export interface TopRatedDishesTableProps {
  vendors: Vendor[];
  meals: Meal[];
  ratings: Rating[];
}

export type SortableFields = keyof Meal | 'Title' | 'Rating' | 'Vendor';
