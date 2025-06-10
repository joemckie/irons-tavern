import Decimal from 'decimal.js-light';

export function calculateEhbPoints(ehb: number, scaling: number) {
  const pointsPerEhb = 10;
  const scaledPoints = new Decimal(ehb)
    .times(pointsPerEhb)
    .times(scaling)
    .toDecimalPlaces(0, Decimal.ROUND_FLOOR)
    .toNumber();

  return scaledPoints;
}
