import { maxDiaryPoints } from './max-diary-points';
import { maxTotalLevelPoints } from './max-total-level-points';

export function calculateMaximumSkillingPointS(scaling: number) {
  // Remove this when Sailing is released
  // It is used to make max points equal 100% pre-Sailing
  const sailingOffset = 4000;

  return (maxDiaryPoints + maxTotalLevelPoints - sailingOffset) * scaling;
}
