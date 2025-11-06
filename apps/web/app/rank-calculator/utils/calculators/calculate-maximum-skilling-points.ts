import { pointsConfig } from '../../config/points';

export function calculateMaximumSkillingPoints(scaling: number) {
  const {
    maxCapePoints,
    achievementDiaryCapePoints,
    maximumAchievementDiaryPoints,
    maximumTotalLevelPoints,
  } = pointsConfig;

  return (
    (maximumAchievementDiaryPoints +
      maximumTotalLevelPoints +
      achievementDiaryCapePoints +
      maxCapePoints) *
    scaling
  );
}
