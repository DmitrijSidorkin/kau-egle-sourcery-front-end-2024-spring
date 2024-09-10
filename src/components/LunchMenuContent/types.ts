import { Meal } from '@/context/MenuAndVendorsContext';

export interface Vendor {
  id: number;
  name: string;
}

export interface PropsMenuCard {
  vendor: Vendor;
  meals: Meal[];
}

export interface Tab {
  value: string;
}
