import Decimal from 'decimal.js-light';

export function calculateDizanasQuiverPoints(
  hasDizanasQuiver: boolean,
  scaling: number,
) {
  const basePoints = hasDizanasQuiver ? 6500 : 0;

  return new Decimal(basePoints).times(scaling).toNumber();
}
