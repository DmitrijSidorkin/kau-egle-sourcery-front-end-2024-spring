import calcWeekStartAndEnd from './calcWeekStartAndEnd';

function dateIsInCurrentWorkWeek(date: Date) {
  const orderDate = new Date(date);
  const weekStartAndEnd = calcWeekStartAndEnd();
  const startOfWeek = new Date(weekStartAndEnd[0]);
  const endOfWeek = new Date(weekStartAndEnd[1]);
  return orderDate >= startOfWeek && orderDate <= endOfWeek;
}
export default dateIsInCurrentWorkWeek;
