import { DayNames } from '@/components/CurrentWeekCards/Enum';
import { OrderHistory, Orders } from '@/context/AuthContext';

function addDateToOrders(orders: Orders[]) {
  const dayNames = Object.values(DayNames);
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  const modifiedOrders: OrderHistory[] = [];
  orders.forEach((order) => {
    if (order.mealIds && order.mealIds?.length > 0) {
      const orderDayIndex = dayNames.indexOf(order.weekDay as DayNames);
      const dayDifference = orderDayIndex - currentDayIndex;
      const orderDate = new Date(currentDate);
      orderDate.setDate(currentDate.getDate() + dayDifference + 1);
      orderDate.setHours(12, 0, 0, 0);
      modifiedOrders.push({ date: orderDate.toISOString(), mealsIds: order.mealIds });
    }
  });
  return modifiedOrders;
}
export default addDateToOrders;
