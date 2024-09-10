export interface Vendor {
  id: number;
  name: string;
}

export interface Meal {
  id: number;
  vendorId: number;
  title: string;
  description: string;
  price: number;
  ordersCount: number;
  vegetarian: boolean;
  weekDays: Array<string>;
  spicy: boolean;
  mealType: string;
  dishType: string;
}

export interface Rating {
  mealId: number;
  rating: {
    userId: number;
    rating: number;
    comment: string;
  };
}
