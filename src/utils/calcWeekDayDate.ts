import { DayNames } from '@/components/CurrentWeekCards/Enum';

function calcWeekDayDate(dayName: string) {
  const dayNames = Object.values(DayNames);
  const matchingDayIndex = dayNames.findIndex((day) => day === dayName);
  const today = new Date();
  const dayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + matchingDayIndex + 1 - today.getDay()
  );
  dayDate.setHours(12, 0, 0, 0);
  if (today.getDay() === 0) {
    dayDate.setDate(dayDate.getDate() - 7);
  }
  return dayDate;
}
export default calcWeekDayDate;
