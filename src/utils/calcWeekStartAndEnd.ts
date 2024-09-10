function calcWeekStartAndEnd() {
  const currentDate = new Date();
  const dayDiffFromMonday = currentDate.getDay() - 1;
  const dayDiffToFriday = 5 - currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - dayDiffFromMonday);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(currentDate.getDate() + dayDiffToFriday);
  endOfWeek.setHours(23, 59, 59, 999);
  return [startOfWeek, endOfWeek];
}
export default calcWeekStartAndEnd;
