interface Orders {
  day: string;
  orders: number[];
}

export interface DayFoodCardProps {
  orders: Orders;
}
