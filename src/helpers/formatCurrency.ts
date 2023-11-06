export const formatCurrencyNumbertoString = (value: any) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}tr`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value;
};