import { Dispatch, SetStateAction } from 'react';
import { Meal } from '@/context/MenuAndVendorsContext';

export interface Vendor {
  id: number;
  name: string;
}

export interface PropsMenuCard {
  vendor: Vendor;
  meals: Meal[];
}

export interface FoodSearchCardProps {
  handleDropdownChange: (event: HTMLButtonElement) => void;
  vendorNames: string[];
  selectedDropdownOption: string;
  meals: Meal[];
  setSearchTerm: (term: string) => void;
  setMeals: Dispatch<SetStateAction<Meal[]>>;
}
