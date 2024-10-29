import { NotableItemsPointCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/use-notable-items-point-calculator';
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
      pointsAwarded: 33145,
      pointsAwardedPercentage: 60.44,
      pointsRemaining: 21695,
      itemsCollected: 212,
      percentageCollected: 71.86,
    },
    fourMonthScaling: {
      pointsAwarded: 23201,
      pointsAwardedPercentage: 60.44,
      pointsRemaining: 15187,
      itemsCollected: 212,
      percentageCollected: 71.86,
    },
    twoMonthScaling: {
      pointsAwarded: 13258,
      pointsAwardedPercentage: 60.44,
      pointsRemaining: 8678,
      itemsCollected: 212,
      percentageCollected: 71.86,
    },
    threeWeekScaling: {
      pointsAwarded: 5800,
      pointsAwardedPercentage: 60.44,
      pointsRemaining: 3797,
      itemsCollected: 212,
      percentageCollected: 71.86,
    },
    noScaling: {
      pointsAwarded: 3314,
      pointsAwardedPercentage: 60.43,
      pointsRemaining: 2170,
      itemsCollected: 212,
      percentageCollected: 71.86,
    },
  },
} satisfies CategoryFixture<
  Omit<NotableItemsPointCalculatorData, 'totalItems'>
>;
