import { Dispatch, SetStateAction } from 'react';
import { Meal } from '@/context/MenuAndVendorsContext';
import { UserData } from '@/context/AuthContext';

export interface Vendor {
  id: number;
  name: string;
}

export interface PropsMenuCard {
  meal: Meal;
  handleToastState: Dispatch<SetStateAction<boolean>>;
  handleToastMealName: Dispatch<SetStateAction<string>>;
  currentUserData: UserData;
}
