import { AchievementDiaryMap } from '@/app/schemas/rank-calculator';

export function isAchievementDiaryCapeAchieved(
  achievementDiaries: AchievementDiaryMap,
) {
  return Object.values(achievementDiaries).every((tier) => tier === 'Elite');
}
