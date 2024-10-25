import { NotableItemsPointCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/use-notable-items-point-calculator';
import { CategoryFixture } from '@/cypress/support/types';

export const notableItemsExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 520,
      pointsAwardedPercentage: 0.95,
      pointsRemaining: 54320,
    },
    fourMonthScaling: {
      pointsAwarded: 364,
      pointsAwardedPercentage: 0.95,
      pointsRemaining: 38024,
    },
    twoMonthScaling: {
      pointsAwarded: 208,
      pointsAwardedPercentage: 0.95,
      pointsRemaining: 21728,
    },
    noScaling: {
      pointsAwarded: 52,
      pointsAwardedPercentage: 0.95,
      pointsRemaining: 5432,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 5290,
      pointsAwardedPercentage: 9.65,
      pointsRemaining: 49550,
    },
    fourMonthScaling: {
      pointsAwarded: 3703,
      pointsAwardedPercentage: 9.65,
      pointsRemaining: 34685,
    },
    twoMonthScaling: {
      pointsAwarded: 2116,
      pointsAwardedPercentage: 9.65,
      pointsRemaining: 19820,
    },
    noScaling: {
      pointsAwarded: 529,
      pointsAwardedPercentage: 9.65,
      pointsRemaining: 4955,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 33145,
      pointsAwardedPercentage: 60.44,
      pointsRemaining: 21695,
    },
    fourMonthScaling: {
      pointsAwarded: 23201,
      pointsAwardedPercentage: 60.44,
      pointsRemaining: 15187,
    },
    twoMonthScaling: {
      pointsAwarded: 13258,
      pointsAwardedPercentage: 60.44,
      pointsRemaining: 8678,
    },
    noScaling: {
      pointsAwarded: 3314,
      pointsAwardedPercentage: 60.43,
      pointsRemaining: 2170,
    },
  },
} satisfies CategoryFixture<
  Omit<
    NotableItemsPointCalculatorData,
    'totalItems' | 'percentageCollected' | 'itemsCollected'
  >
>;
