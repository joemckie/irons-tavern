import { formatNumber } from './format-number';

export function getPointsRemainingLabel(pointsRemaining: number) {
  return pointsRemaining ? `(${formatNumber(pointsRemaining)})` : 'Completed';
}
