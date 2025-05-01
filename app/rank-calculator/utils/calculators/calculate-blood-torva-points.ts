import Decimal from 'decimal.js-light';
import { pointsConfig } from '../../config/points';

export function calculateBloodTorvaPoints(
  hasBloodTorva: boolean,
  scaling: number,
) {
  const basePoints = hasBloodTorva ? pointsConfig.bloodTorvaPoints : 0;

  return new Decimal(basePoints).times(scaling).toNumber();
}
