import { Dispatch, SetStateAction } from 'react';
import { AvailableLunch, UserData } from '@/context/AuthContext';
import calcWeekDayDate from '@/utils/calcWeekDayDate';
import { updateUserData } from '@/utils/updateUserData';
import { DayNames } from '../../Enum';

function giveAway(
  currentUserData: UserData,
  setCurrentUserDate: Dispatch<SetStateAction<UserData>>,
  availableLunch: AvailableLunch[]
) {
  const orderDate = calcWeekDayDate(DayNames.Friday);
  const currentOrder = currentUserData.orderHistory?.find(
    (order) => order.date === orderDate.toISOString()
  );
  if (currentOrder?.mealsIds) {
    const modifiedOrder: AvailableLunch = {
      username: currentUserData.userName,
      mealIds: currentOrder.mealsIds,
    };
    const updatedAvailableLunch = [...availableLunch, modifiedOrder];

    currentUserData.orderHistory = (currentUserData.orderHistory ?? []).filter(
      (order) => order.date !== orderDate.toISOString()
    );
    setCurrentUserDate(currentUserData);
    updateUserData({ currentUser: currentUserData.userName, updatedUserData: currentUserData });
    return updatedAvailableLunch;
  }
  return [];
}
export default giveAway;
