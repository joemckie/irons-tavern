import { CategoryFixture } from '@/cypress/support/types';

export const notableItemsExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 520,
      pointsAwardedPercentage: 0.95,
      pointsRemaining: 54320,
    },
    fourMonthScaling: {
      pointsAwarded: 0,
      pointsAwardedPercentage: 0,
      pointsRemaining: 0,
    },
    twoMonthScaling: {
      pointsAwarded: 0,
      pointsAwardedPercentage: 0,
      pointsRemaining: 0,
    },
    noScaling: {
      pointsAwarded: 0,
      pointsAwardedPercentage: 0,
      pointsRemaining: 0,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 5290,
      pointsAwardedPercentage: 9.65,
      pointsRemaining: 49550,
    },
    fourMonthScaling: {
      pointsAwarded: 0,
      pointsAwardedPercentage: 0,
      pointsRemaining: 0,
    },
    twoMonthScaling: {
      pointsAwarded: 0,
      pointsAwardedPercentage: 0,
      pointsRemaining: 0,
    },
    noScaling: {
      pointsAwarded: 0,
      pointsAwardedPercentage: 0,
      pointsRemaining: 0,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 33145,
      pointsAwardedPercentage: 60.44,
      pointsRemaining: 21695,
    },
    fourMonthScaling: {
      pointsAwarded: 0,
      pointsAwardedPercentage: 0,
      pointsRemaining: 0,
    },
    twoMonthScaling: {
      pointsAwarded: 0,
      pointsAwardedPercentage: 0,
      pointsRemaining: 0,
    },
    noScaling: {
      pointsAwarded: 0,
      pointsAwardedPercentage: 0,
      pointsRemaining: 0,
    },
  },
} satisfies CategoryFixture;
