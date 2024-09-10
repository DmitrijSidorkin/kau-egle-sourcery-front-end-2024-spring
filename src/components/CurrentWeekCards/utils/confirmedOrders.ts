import { OrderHistory, UserData } from '@/context/AuthContext';
import dateIsInCurrentWorkWeek from '@/utils/dateIsInCurrentWorkWeek';
import { DayNames } from '../Enum';

function confirmedOrders(currentUserData: UserData) {
  const dayNames = Object.values(DayNames);

  const currentUserWeekOrders: { day: string; orders: number[] }[] = [];
  dayNames.forEach((day) => {
    currentUserWeekOrders.push({ day, orders: [] });
  });
  let hasValidOrders = false;
  if (currentUserData.orderHistory?.length !== 0) {
    hasValidOrders = dateIsInCurrentWorkWeek(
      currentUserData.orderHistory?.[currentUserData.orderHistory.length - 1]
        .date as unknown as Date
    );
  }
  if (hasValidOrders) {
    currentUserData.orderHistory?.forEach((order: OrderHistory) => {
      const orderDate = new Date(order.date);
      if (dateIsInCurrentWorkWeek(orderDate)) {
        currentUserWeekOrders[orderDate.getDay() - 1].orders = order.mealsIds || [];
      }
    });
  }
  return currentUserWeekOrders;
}
export default confirmedOrders;
