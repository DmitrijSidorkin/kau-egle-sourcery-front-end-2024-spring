function numberWithComma(number: number): string {
  const parts = number.toFixed(2).toString().split('.');
  return `${parts[0]},${parts[1]}`;
}
export default numberWithComma;
