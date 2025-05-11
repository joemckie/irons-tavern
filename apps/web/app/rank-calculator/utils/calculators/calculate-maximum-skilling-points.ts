import { pointsConfig } from '../../config/points';

export function calculateMaximumSkillingPoints(scaling: number) {
  // Remove sailing offset when Sailing is released
  // It is used to make max points equal 100% pre-Sailing
  const {
    sailingOffset,
    maxCapePoints,
    achievementDiaryCapePoints,
    maximumAchievementDiaryPoints,
    maximumTotalLevelPoints,
  } = pointsConfig;

  return (
    (maximumAchievementDiaryPoints +
      maximumTotalLevelPoints +
      achievementDiaryCapePoints +
      maxCapePoints -
      sailingOffset) *
    scaling
  );
}
