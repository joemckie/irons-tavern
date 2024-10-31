import { CollectionLogPointCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/collection-log/use-collection-log-point-calculator';
import { CategoryFixture } from '@/cypress/support/types';

export const collectionLogExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 690,
      pointsAwardedPercentage: 0.0106,
      pointsRemaining: 64110,
      collectionLogSlotPoints: 690,
    },
    fourMonthScaling: {
      pointsAwarded: 483,
      pointsAwardedPercentage: 0.0106,
      pointsRemaining: 44877,
      collectionLogSlotPoints: 483,
    },
    twoMonthScaling: {
      pointsAwarded: 276,
      pointsAwardedPercentage: 0.0106,
      pointsRemaining: 25644,
      collectionLogSlotPoints: 276,
    },
    threeWeekScaling: {
      pointsAwarded: 120,
      pointsAwardedPercentage: 0.0106,
      pointsRemaining: 11220,
      collectionLogSlotPoints: 120,
    },
    noScaling: {
      pointsAwarded: 69, // Nice
      pointsAwardedPercentage: 0.0106,
      pointsRemaining: 6411,
      collectionLogSlotPoints: 69, // Nice
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 15640,
      pointsAwardedPercentage: 0.2414,
      pointsRemaining: 49160,
      collectionLogSlotPoints: 15640,
    },
    fourMonthScaling: {
      pointsAwarded: 10948,
      pointsAwardedPercentage: 0.2414,
      pointsRemaining: 34412,
      collectionLogSlotPoints: 10948,
    },
    twoMonthScaling: {
      pointsAwarded: 6256,
      pointsAwardedPercentage: 0.2414,
      pointsRemaining: 19664,
      collectionLogSlotPoints: 6256,
    },
    threeWeekScaling: {
      pointsAwarded: 2737,
      pointsAwardedPercentage: 0.2414,
      pointsRemaining: 8603,
      collectionLogSlotPoints: 2737,
    },
    noScaling: {
      pointsAwarded: 1564,
      pointsAwardedPercentage: 0.2414,
      pointsRemaining: 4916,
      collectionLogSlotPoints: 1564,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 46340,
      pointsAwardedPercentage: 0.7151,
      pointsRemaining: 18460,
      collectionLogSlotPoints: 46340,
    },
    fourMonthScaling: {
      pointsAwarded: 32438,
      pointsAwardedPercentage: 0.7151,
      pointsRemaining: 12922,
      collectionLogSlotPoints: 32438,
    },
    twoMonthScaling: {
      pointsAwarded: 18536,
      pointsAwardedPercentage: 0.7151,
      pointsRemaining: 7384,
      collectionLogSlotPoints: 18536,
    },
    threeWeekScaling: {
      pointsAwarded: 8109,
      pointsAwardedPercentage: 0.7151,
      pointsRemaining: 3231,
      collectionLogSlotPoints: 8109,
    },
    noScaling: {
      pointsAwarded: 4634,
      pointsAwardedPercentage: 0.7151,
      pointsRemaining: 1846,
      collectionLogSlotPoints: 4634,
    },
  },
} satisfies CategoryFixture<CollectionLogPointCalculatorData>;
