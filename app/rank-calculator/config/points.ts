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
  notableItemsPointsPerHour: 3,
  sailingOffset: 4000,
  maxCapePoints: 7000,
  achievementDiaryCapePoints: 1000,
  maximumTotalLevelPoints: 50000,
  maximumAchievementDiaryPoints:
    DiaryLocation.options.length * achievementDiaryTierPoints.Elite,
  maximumCombatAchievementPoints: 50000,
  bloodTorvaPoints: 6500,
  dizanasQuiverPoints: 6500,
  infernalCapePoints: 7000,
  fireCapePoints: 500,
} as const satisfies Record<string, number>;
