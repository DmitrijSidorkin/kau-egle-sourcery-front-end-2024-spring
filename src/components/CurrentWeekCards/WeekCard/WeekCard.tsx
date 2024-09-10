import { ConfirmedOrders } from '@/context/AuthContext';
import DayFoodCard from '../DayFoodCard/DayFoodCard';
import TooLateCard from '../TooLateCard/TooLateCard';
import EmptyCard from '../EmptyCard/EmptyCard';
// import calcWeekDayDate from '@/utils/calcWeekDayDate';
import { DayNames } from '../Enum';
import styles from './WeekCard.module.scss';

interface CardProps {
  orderDay: ConfirmedOrders;
}

function WeekCard({ orderDay }: CardProps) {
  const dayNames = Object.values(DayNames);

  // function isTooLateToOrder(date: string) {
  //   const currentDate = new Date();
  //   return currentDate > calcWeekDayDate(date);
  // }
  return (
    <div className={styles['card']}>
      {orderDay.day === dayNames[dayNames.length - 1] && orderDay.orders.length === 0 && true && (
        <TooLateCard />
      )}
      {orderDay.orders.length > 0 ? (
        <DayFoodCard orders={orderDay} />
      ) : (
        <EmptyCard day={orderDay.day} />
      )}
    </div>
  );
}
export default WeekCard;
