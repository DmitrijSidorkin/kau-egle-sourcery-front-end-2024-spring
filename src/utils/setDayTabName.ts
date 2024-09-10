import { DayNames } from '@/components/CurrentWeekCards/Enum';

const dayNames = Object.values(DayNames);
const currentDay = new Date().getDay();
function setDayTabName() {
  if (currentDay > 5 || currentDay === 0) {
    return dayNames[0];
  }
  return dayNames[currentDay - 1];
}
export default setDayTabName;
