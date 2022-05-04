export const getPercentValue = (data, number) => {
  const value = Number(((data * 100) / number).toFixed(2));

  return value;
};
