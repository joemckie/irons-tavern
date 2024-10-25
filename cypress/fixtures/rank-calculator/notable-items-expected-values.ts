import { CategoryFixture } from '@/cypress/support/types';

export const notableItemsExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 520,
      pointsRemaining: 54320,
    },
    fourMonthScaling: {
      pointsAwarded: 364,
      pointsRemaining: 38024,
    },
    twoMonthScaling: {
      pointsAwarded: 208,
      pointsRemaining: 21728,
    },
    noScaling: {
      pointsAwarded: 52,
      pointsRemaining: 5432,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 5290,
      pointsRemaining: 49550,
    },
    fourMonthScaling: {
      pointsAwarded: 3703,
      pointsRemaining: 34685,
    },
    twoMonthScaling: {
      pointsAwarded: 2116,
      pointsRemaining: 19820,
    },
    noScaling: {
      pointsAwarded: 529,
      pointsRemaining: 4955,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 33145,
      pointsRemaining: 21695,
    },
    fourMonthScaling: {
      pointsAwarded: 23201,
      pointsRemaining: 15187,
    },
    twoMonthScaling: {
      pointsAwarded: 13258,
      pointsRemaining: 8678,
    },
    noScaling: {
      pointsAwarded: 3314,
      pointsRemaining: 2170,
    },
  },
} satisfies CategoryFixture;
