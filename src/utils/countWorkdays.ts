function countWorkdays() {
  const currentDate = new Date();

  const currentDayOfWeek = currentDate.getDay();

  const daysUntilMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  const daysUntilFriday = 5 - currentDayOfWeek;

  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - daysUntilMonday);
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + daysUntilFriday);

  const startDayFormatted = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const endDayFormatted = endDate.toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
  });

  return {
    startDay: startDayFormatted,
    endDay: endDayFormatted,
  };
}

export default countWorkdays;
