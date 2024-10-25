import { CombatPointCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/use-combat-point-calculator';
import { CategoryFixture } from '@/cypress/support/types';

export const combatExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 2510,
      pointsAwardedPercentage: 5,
      pointsRemaining: 47500,
      caTierPoints: 0,
      ehbPoints: 0,
    },
    fourMonthScaling: {
      pointsAwarded: 1757,
      pointsAwardedPercentage: 5,
      pointsRemaining: 33250,
      caTierPoints: 0,
      ehbPoints: 0,
    },
    twoMonthScaling: {
      pointsAwarded: 1004,
      pointsAwardedPercentage: 5,
      pointsRemaining: 19000,
      caTierPoints: 0,
      ehbPoints: 0,
    },
    noScaling: {
      pointsAwarded: 251,
      pointsAwardedPercentage: 5,
      pointsRemaining: 4750,
      caTierPoints: 0,
      ehbPoints: 0,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 25240,
      pointsAwardedPercentage: 40,
      pointsRemaining: 30000,
      caTierPoints: 0,
      ehbPoints: 0,
    },
    fourMonthScaling: {
      pointsAwarded: 17668,
      pointsAwardedPercentage: 40,
      pointsRemaining: 21000,
      caTierPoints: 0,
      ehbPoints: 0,
    },
    twoMonthScaling: {
      pointsAwarded: 10096,
      pointsAwardedPercentage: 40,
      pointsRemaining: 12000,
      caTierPoints: 0,
      ehbPoints: 0,
    },
    noScaling: {
      pointsAwarded: 2524,
      pointsAwardedPercentage: 40,
      pointsRemaining: 3000,
      caTierPoints: 0,
      ehbPoints: 0,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 76020,
      pointsAwardedPercentage: 100,
      pointsRemaining: 0,
      caTierPoints: 0,
      ehbPoints: 0,
    },
    fourMonthScaling: {
      pointsAwarded: 53214,
      pointsAwardedPercentage: 100,
      pointsRemaining: 0,
      caTierPoints: 0,
      ehbPoints: 0,
    },
    twoMonthScaling: {
      pointsAwarded: 30408,
      pointsAwardedPercentage: 100,
      pointsRemaining: 0,
      caTierPoints: 0,
      ehbPoints: 0,
    },
    noScaling: {
      pointsAwarded: 7602,
      pointsAwardedPercentage: 100,
      pointsRemaining: 0,
      caTierPoints: 0,
      ehbPoints: 0,
    },
  },
} satisfies CategoryFixture<CombatPointCalculatorData>;
