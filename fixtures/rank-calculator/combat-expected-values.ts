import { CombatPointCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/combat/use-combat-point-calculator';
import { CategoryFixture } from '@/cypress/support/types';

export const combatExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 2510,
      pointsAwardedPercentage: 5,
      pointsRemaining: 47500,
      combatAchievementTierPoints: 2500,
      ehbPoints: 10,
    },
    fourMonthScaling: {
      pointsAwarded: 1757,
      pointsAwardedPercentage: 5,
      pointsRemaining: 33250,
      combatAchievementTierPoints: 1750,
      ehbPoints: 7,
    },
    twoMonthScaling: {
      pointsAwarded: 1004,
      pointsAwardedPercentage: 5,
      pointsRemaining: 19000,
      combatAchievementTierPoints: 1000,
      ehbPoints: 4,
    },
    threeWeekScaling: {
      pointsAwarded: 438,
      pointsAwardedPercentage: 4.99,
      pointsRemaining: 8313,
      combatAchievementTierPoints: 437,
      ehbPoints: 1,
    },
    noScaling: {
      pointsAwarded: 251,
      pointsAwardedPercentage: 5,
      pointsRemaining: 4750,
      combatAchievementTierPoints: 250,
      ehbPoints: 1,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 25240,
      pointsAwardedPercentage: 40,
      pointsRemaining: 30000,
      combatAchievementTierPoints: 20000,
      ehbPoints: 5240,
    },
    fourMonthScaling: {
      pointsAwarded: 17668,
      pointsAwardedPercentage: 40,
      pointsRemaining: 21000,
      combatAchievementTierPoints: 14000,
      ehbPoints: 3668,
    },
    twoMonthScaling: {
      pointsAwarded: 10096,
      pointsAwardedPercentage: 40,
      pointsRemaining: 12000,
      combatAchievementTierPoints: 8000,
      ehbPoints: 2096,
    },
    threeWeekScaling: {
      pointsAwarded: 4417,
      pointsAwardedPercentage: 40,
      pointsRemaining: 5250,
      combatAchievementTierPoints: 3500,
      ehbPoints: 917,
    },
    noScaling: {
      pointsAwarded: 2524,
      pointsAwardedPercentage: 40,
      pointsRemaining: 3000,
      combatAchievementTierPoints: 2000,
      ehbPoints: 524,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 76020,
      pointsAwardedPercentage: 100,
      pointsRemaining: 0,
      combatAchievementTierPoints: 50000,
      ehbPoints: 26020,
    },
    fourMonthScaling: {
      pointsAwarded: 53214,
      pointsAwardedPercentage: 100,
      pointsRemaining: 0,
      combatAchievementTierPoints: 35000,
      ehbPoints: 18214,
    },
    twoMonthScaling: {
      pointsAwarded: 30408,
      pointsAwardedPercentage: 100,
      pointsRemaining: 0,
      combatAchievementTierPoints: 20000,
      ehbPoints: 10408,
    },
    threeWeekScaling: {
      pointsAwarded: 13303,
      pointsAwardedPercentage: 100,
      pointsRemaining: 0,
      combatAchievementTierPoints: 8750,
      ehbPoints: 4553,
    },
    noScaling: {
      pointsAwarded: 7602,
      pointsAwardedPercentage: 100,
      pointsRemaining: 0,
      combatAchievementTierPoints: 5000,
      ehbPoints: 2602,
    },
  },
} satisfies CategoryFixture<CombatPointCalculatorData>;
