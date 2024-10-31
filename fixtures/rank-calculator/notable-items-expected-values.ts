import { NotableItemsPointCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/notable-items/use-notable-items-point-calculator';
import { CategoryFixture } from '@/cypress/support/types';

export const notableItemsExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 520,
      pointsAwardedPercentage: 0.0095,
      pointsRemaining: 54320,
      itemsCollected: 5,
      percentageCollected: 0.0169,
    },
    fourMonthScaling: {
      pointsAwarded: 364,
      pointsAwardedPercentage: 0.0095,
      pointsRemaining: 38024,
      itemsCollected: 5,
      percentageCollected: 0.0169,
    },
    twoMonthScaling: {
      pointsAwarded: 208,
      pointsAwardedPercentage: 0.0095,
      pointsRemaining: 21728,
      itemsCollected: 5,
      percentageCollected: 0.0169,
    },
    threeWeekScaling: {
      pointsAwarded: 91,
      pointsAwardedPercentage: 0.0095,
      pointsRemaining: 9506,
      itemsCollected: 5,
      percentageCollected: 0.0169,
    },
    noScaling: {
      pointsAwarded: 52,
      pointsAwardedPercentage: 0.0095,
      pointsRemaining: 5432,
      itemsCollected: 5,
      percentageCollected: 0.0169,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 5290,
      pointsAwardedPercentage: 0.0965,
      pointsRemaining: 49550,
      itemsCollected: 99,
      percentageCollected: 0.3356,
    },
    fourMonthScaling: {
      pointsAwarded: 3703,
      pointsAwardedPercentage: 0.0965,
      pointsRemaining: 34685,
      itemsCollected: 99,
      percentageCollected: 0.3356,
    },
    twoMonthScaling: {
      pointsAwarded: 2116,
      pointsAwardedPercentage: 0.0965,
      pointsRemaining: 19820,
      itemsCollected: 99,
      percentageCollected: 0.3356,
    },
    threeWeekScaling: {
      pointsAwarded: 925,
      pointsAwardedPercentage: 0.0964,
      pointsRemaining: 8672,
      itemsCollected: 99,
      percentageCollected: 0.3356,
    },
    noScaling: {
      pointsAwarded: 529,
      pointsAwardedPercentage: 0.0965,
      pointsRemaining: 4955,
      itemsCollected: 99,
      percentageCollected: 0.3356,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 35245,
      pointsAwardedPercentage: 0.6427,
      pointsRemaining: 19595,
      itemsCollected: 214,
      percentageCollected: 0.7254,
    },
    fourMonthScaling: {
      pointsAwarded: 24671,
      pointsAwardedPercentage: 0.6427,
      pointsRemaining: 13717,
      itemsCollected: 214,
      percentageCollected: 0.7254,
    },
    twoMonthScaling: {
      pointsAwarded: 14098,
      pointsAwardedPercentage: 0.6427,
      pointsRemaining: 7838,
      itemsCollected: 214,
      percentageCollected: 0.7254,
    },
    threeWeekScaling: {
      pointsAwarded: 6167,
      pointsAwardedPercentage: 0.6426,
      pointsRemaining: 3430,
      itemsCollected: 214,
      percentageCollected: 0.7254,
    },
    noScaling: {
      pointsAwarded: 3524,
      pointsAwardedPercentage: 0.6426,
      pointsRemaining: 1960,
      itemsCollected: 214,
      percentageCollected: 0.7254,
    },
  },
} satisfies CategoryFixture<
  Omit<NotableItemsPointCalculatorData, 'totalItems'>
>;
