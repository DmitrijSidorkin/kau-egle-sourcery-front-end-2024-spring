import { ReactNode, createContext, useMemo, useState } from 'react';

export interface Vendor {
  id: number;
  name: string;
  rating?: number;
  avgRating?: number;
  ratingsCount?: number;
}

export interface Meal {
  id: number;
  vendorId: number;
  title: string;
  description: string;
  price: number;
  vegetarian: boolean;
  spicy: boolean;
  ordersCount: number;
  weekDays: string[];
  mealType: string;
  dishType: string;
  averageRating?: number | null;
}

export interface Rating {
  mealId: number;
  rating: {
    userId: number;
    rating: number;
    comment: string;
  };
}

export interface MenuAndVendorsContextType {
  vendors: Vendor[];
  setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  ratings: Rating[];
  setRatings: React.Dispatch<React.SetStateAction<Rating[]>>;
}

export const MenuAndVendorsContext = createContext<MenuAndVendorsContextType>({
  vendors: [],
  setVendors: () => {},
  meals: [],
  setMeals: () => {},
  ratings: [],
  setRatings: () => {},
});

export function MenuAndVendorsContextProvider({ children }: { children: ReactNode }) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);

  const contextValue = useMemo(
    () => ({
      vendors,
      setVendors,
      meals,
      setMeals,
      ratings,
      setRatings,
    }),
    [vendors, setVendors, meals, setMeals, ratings, setRatings]
  );

  return (
    <MenuAndVendorsContext.Provider value={contextValue}>{children}</MenuAndVendorsContext.Provider>
  );
}
