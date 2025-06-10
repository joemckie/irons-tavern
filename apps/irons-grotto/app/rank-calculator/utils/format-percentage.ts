export function formatPercentage(
  percentage: number,
  maximumFractionDigits = 2,
) {
  return Intl.NumberFormat(undefined, {
    maximumFractionDigits,
    style: 'percent',
  }).format(percentage);
}
