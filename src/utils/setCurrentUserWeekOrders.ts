import { Dispatch, SetStateAction } from 'react';
import { CurrentWeekDayOrder, OrderHistory, Orders, UserData } from '@/context/AuthContext';
import dateIsInCurrentWorkWeek from './dateIsInCurrentWorkWeek';
import { DayNames } from '@/components/CurrentWeekCards/Enum';
import { updateUserData } from './updateUserData';

function setCurrentUserWeekOrders(
  currentUser: string | undefined,
  setOrderedThisWeek: Dispatch<SetStateAction<CurrentWeekDayOrder[]>>,
  setCurrentUserData: Dispatch<SetStateAction<UserData>>,
  isCheckout?: boolean
) {
  const dayNames = Object.values(DayNames);
  const existingUsers = JSON.parse(localStorage.getItem('userInfo') || '[]');
  const currentUserData = JSON.parse(
    JSON.stringify(existingUsers.find((user: UserData) => user.userName === currentUser))
  );
  const currentUserWeekOrders: { day: string; orders: number[] }[] = [];
  dayNames.forEach((day) => {
    currentUserWeekOrders.push({ day, orders: [] });
  });
  let hasValidOrders = false;
  if (currentUserData.orderHistory.length !== 0) {
    hasValidOrders = dateIsInCurrentWorkWeek(
      currentUserData.orderHistory[currentUserData.orderHistory.length - 1].date
    );
  }

  if (hasValidOrders || currentUserData.orders.length !== 0) {
    if (hasValidOrders) {
      currentUserData.orderHistory.forEach((order: OrderHistory) => {
        const orderDate = new Date(order.date || '');
        if (dateIsInCurrentWorkWeek(orderDate)) {
          currentUserWeekOrders[orderDate.getDay() - 1].orders = order.mealsIds || [];
        }
      });
    }
    if (currentUserData.orders.length > 0) {
      currentUserData.orders.forEach((order: Orders) => {
        const orderIndex = currentUserWeekOrders.findIndex((day) => day.day === order.weekDay);
        if (order.mealIds && orderIndex >= 0) {
          if (currentUserWeekOrders[orderIndex].orders.length > 0) {
            currentUserWeekOrders[orderIndex].orders.push(order.mealIds[0]);
          } else {
            currentUserWeekOrders[orderIndex].orders = order.mealIds;
          }
        }
      });
    }
  }
  setOrderedThisWeek(currentUserWeekOrders);
  if (isCheckout) {
    updateUserData({ currentUser: currentUserData.userName, updatedUserData: currentUserData });
    setCurrentUserData(currentUserData);
  }
}
export default setCurrentUserWeekOrders;
