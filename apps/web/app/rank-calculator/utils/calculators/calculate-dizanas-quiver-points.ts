import Decimal from 'decimal.js-light';
import { pointsConfig } from '../../config/points';

export function calculateDizanasQuiverPoints(
  hasDizanasQuiver: boolean,
  scaling: number,
) {
  const basePoints = hasDizanasQuiver ? pointsConfig.dizanasQuiverPoints : 0;

  return new Decimal(basePoints).times(scaling).toNumber();
}
