import { Dispatch, SetStateAction } from 'react';
import { UserData } from '@/context/AuthContext';
import calcWeekDayDate from '@/utils/calcWeekDayDate';
import { updateUserData } from '@/utils/updateUserData';

function cancelOrder(
  currentUserData: UserData,
  setCurrentUserDate: Dispatch<SetStateAction<UserData>>,
  orderDay: string
) {
  const orderDate = calcWeekDayDate(orderDay);
  currentUserData.orderHistory = (currentUserData.orderHistory ?? []).filter(
    (order) => order.date !== orderDate.toISOString()
  );
  setCurrentUserDate(currentUserData);
  updateUserData({ currentUser: currentUserData.userName, updatedUserData: currentUserData });
}
export default cancelOrder;
