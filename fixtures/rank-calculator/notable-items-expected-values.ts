import { NotableItemsPointCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/notable-items/use-notable-items-point-calculator';
import { CategoryFixture } from '@/cypress/support/types';

export const notableItemsExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 520,
      pointsAwardedPercentage: 0.95,
      pointsRemaining: 54320,
      itemsCollected: 5,
      percentageCollected: 1.69,
    },
    fourMonthScaling: {
      pointsAwarded: 364,
      pointsAwardedPercentage: 0.95,
      pointsRemaining: 38024,
      itemsCollected: 5,
      percentageCollected: 1.69,
    },
    twoMonthScaling: {
      pointsAwarded: 208,
      pointsAwardedPercentage: 0.95,
      pointsRemaining: 21728,
      itemsCollected: 5,
      percentageCollected: 1.69,
    },
    threeWeekScaling: {
      pointsAwarded: 91,
      pointsAwardedPercentage: 0.95,
      pointsRemaining: 9506,
      itemsCollected: 5,
      percentageCollected: 1.69,
    },
    noScaling: {
      pointsAwarded: 52,
      pointsAwardedPercentage: 0.95,
      pointsRemaining: 5432,
      itemsCollected: 5,
      percentageCollected: 1.69,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 5290,
      pointsAwardedPercentage: 9.65,
      pointsRemaining: 49550,
      itemsCollected: 99,
      percentageCollected: 33.56,
    },
    fourMonthScaling: {
      pointsAwarded: 3703,
      pointsAwardedPercentage: 9.65,
      pointsRemaining: 34685,
      itemsCollected: 99,
      percentageCollected: 33.56,
    },
    twoMonthScaling: {
      pointsAwarded: 2116,
      pointsAwardedPercentage: 9.65,
      pointsRemaining: 19820,
      itemsCollected: 99,
      percentageCollected: 33.56,
    },
    threeWeekScaling: {
      pointsAwarded: 925,
      pointsAwardedPercentage: 9.64,
      pointsRemaining: 8672,
      itemsCollected: 99,
      percentageCollected: 33.56,
    },
    noScaling: {
      pointsAwarded: 529,
      pointsAwardedPercentage: 9.65,
      pointsRemaining: 4955,
      itemsCollected: 99,
      percentageCollected: 33.56,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 35245,
      pointsAwardedPercentage: 64.27,
      pointsRemaining: 19595,
      itemsCollected: 214,
      percentageCollected: 72.54,
    },
    fourMonthScaling: {
      pointsAwarded: 24671,
      pointsAwardedPercentage: 64.27,
      pointsRemaining: 13717,
      itemsCollected: 214,
      percentageCollected: 72.54,
    },
    twoMonthScaling: {
      pointsAwarded: 14098,
      pointsAwardedPercentage: 64.27,
      pointsRemaining: 7838,
      itemsCollected: 214,
      percentageCollected: 72.54,
    },
    threeWeekScaling: {
      pointsAwarded: 6167,
      pointsAwardedPercentage: 64.26,
      pointsRemaining: 3430,
      itemsCollected: 214,
      percentageCollected: 72.54,
    },
    noScaling: {
      pointsAwarded: 3524,
      pointsAwardedPercentage: 64.26,
      pointsRemaining: 1960,
      itemsCollected: 214,
      percentageCollected: 72.54,
    },
  },
} satisfies CategoryFixture<
  Omit<NotableItemsPointCalculatorData, 'totalItems'>
>;
