import Decimal from 'decimal.js-light';

export function calculateBloodTorvaPoints(
  hasBloodTorva: boolean,
  scaling: number,
) {
  const basePoints = hasBloodTorva ? 6500 : 0;

  return new Decimal(basePoints).times(scaling).toNumber();
}
