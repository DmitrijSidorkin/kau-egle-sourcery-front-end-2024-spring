import { Rating } from '@/context/MenuAndVendorsContext';

export interface User {
  id: number;
  name: string;
  surname: string;
  img: string;
}

export interface CommentsProps {
  ratings: Rating[];
  mealId: number;
  displayStars?: boolean;
}
