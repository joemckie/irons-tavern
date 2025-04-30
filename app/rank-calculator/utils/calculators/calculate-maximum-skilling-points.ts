import { maxDiaryPoints } from './max-diary-points';
import { maxTotalLevelPoints } from './max-total-level-points';

export function calculateMaximumSkillingPoints(scaling: number) {
  // Remove this when Sailing is released
  // It is used to make max points equal 100% pre-Sailing
  const sailingOffset = 4000;
  const maxCapePoints = 7000;
  const achievementDiaryCapePoints = 1000;

  return (
    (maxDiaryPoints +
      maxTotalLevelPoints +
      achievementDiaryCapePoints +
      maxCapePoints -
      sailingOffset) *
    scaling
  );
}
