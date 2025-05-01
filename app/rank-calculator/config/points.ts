import { DiaryLocation, DiaryTier } from '@/app/schemas/osrs';

export const achievementDiaryTierPoints = {
  get None() {
    return this.Elite * 0;
  },
  get Easy() {
    return this.Elite * 0.1;
  },
  get Medium() {
    return this.Elite * 0.3;
  },
  get Hard() {
    return this.Elite * 0.6;
  },
  get Elite() {
    return 1000;
  },
} satisfies Record<DiaryTier, number>;

export const pointsConfig = {
  sailingOffset: 4000,
  maxCapePoints: 7000,
  achievementDiaryCapePoints: 1000,
  maxTotalLevelPoints: 50000,
  maxAchievementDiaryPoints:
    DiaryLocation.options.length * achievementDiaryTierPoints.Elite,
} as const satisfies Record<string, number>;
