import { CollectionLogPointCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/use-collection-log-point-calculator';
import { CategoryFixture } from '@/cypress/support/types';

export const collectionLogExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 690,
      pointsAwardedPercentage: 1.13,
      pointsRemaining: 60270,
      collectionLogSlotPoints: 690,
    },
    fourMonthScaling: {
      pointsAwarded: 483,
      pointsAwardedPercentage: 1.13,
      pointsRemaining: 42189,
      collectionLogSlotPoints: 483,
    },
    twoMonthScaling: {
      pointsAwarded: 276,
      pointsAwardedPercentage: 1.13,
      pointsRemaining: 24108,
      collectionLogSlotPoints: 276,
    },
    noScaling: {
      pointsAwarded: 69, // Nice
      pointsAwardedPercentage: 1.13,
      pointsRemaining: 6027,
      collectionLogSlotPoints: 69, // Nice
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 15640,
      pointsAwardedPercentage: 25.66,
      pointsRemaining: 45320,
      collectionLogSlotPoints: 15640,
    },
    fourMonthScaling: {
      pointsAwarded: 10948,
      pointsAwardedPercentage: 25.66,
      pointsRemaining: 31724,
      collectionLogSlotPoints: 10948,
    },
    twoMonthScaling: {
      pointsAwarded: 6256,
      pointsAwardedPercentage: 25.66,
      pointsRemaining: 18128,
      collectionLogSlotPoints: 6256,
    },
    noScaling: {
      pointsAwarded: 1564,
      pointsAwardedPercentage: 25.66,
      pointsRemaining: 4532,
      collectionLogSlotPoints: 1564,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 46340,
      pointsAwardedPercentage: 76.02,
      pointsRemaining: 14620,
      collectionLogSlotPoints: 46340,
    },
    fourMonthScaling: {
      pointsAwarded: 32438,
      pointsAwardedPercentage: 76.02,
      pointsRemaining: 10234,
      collectionLogSlotPoints: 32438,
    },
    twoMonthScaling: {
      pointsAwarded: 18536,
      pointsAwardedPercentage: 76.02,
      pointsRemaining: 5848,
      collectionLogSlotPoints: 18536,
    },
    noScaling: {
      pointsAwarded: 4634,
      pointsAwardedPercentage: 76.02,
      pointsRemaining: 1462,
      collectionLogSlotPoints: 4634,
    },
  },
} satisfies CategoryFixture<CollectionLogPointCalculatorData>;
