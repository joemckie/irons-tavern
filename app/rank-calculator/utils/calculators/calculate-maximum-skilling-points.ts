import { pointsConfig } from '../../config/points';

export function calculateMaximumSkillingPoints(scaling: number) {
  // Remove sailing offset when Sailing is released
  // It is used to make max points equal 100% pre-Sailing
  const {
    sailingOffset,
    maxCapePoints,
    achievementDiaryCapePoints,
    maxAchievementDiaryPoints,
    maxTotalLevelPoints,
  } = pointsConfig;

  return (
    (maxAchievementDiaryPoints +
      maxTotalLevelPoints +
      achievementDiaryCapePoints +
      maxCapePoints -
      sailingOffset) *
    scaling
  );
}
