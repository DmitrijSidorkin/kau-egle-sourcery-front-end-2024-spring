import { Meal } from '@/context/MenuAndVendorsContext';

export interface Vendor {
  id: number;
  name: string;
}

export interface PropsMenuCard {
  vendors: Vendor[];
  meals: Meal[];
  errors: string | null;
}
