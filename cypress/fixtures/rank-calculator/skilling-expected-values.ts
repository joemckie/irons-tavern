import { CategoryFixture } from '@/cypress/support/types';

export const skillingExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 27061,
      pointsAwardedPercentage: 37.71,
      pointsRemaining: 38619,
    },
    fourMonthScaling: {
      pointsAwarded: 18942,
      pointsAwardedPercentage: 37.71,
      pointsRemaining: 27034,
    },
    twoMonthScaling: {
      pointsAwarded: 10824,
      pointsAwardedPercentage: 37.71,
      pointsRemaining: 15448,
    },
    noScaling: {
      pointsAwarded: 2706,
      pointsAwardedPercentage: 37.71,
      pointsRemaining: 3862,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 65458,
      pointsAwardedPercentage: 87.13,
      pointsRemaining: 7982,
    },
    fourMonthScaling: {
      pointsAwarded: 45820,
      pointsAwardedPercentage: 87.12,
      pointsRemaining: 5588,
    },
    twoMonthScaling: {
      pointsAwarded: 26183,
      pointsAwardedPercentage: 87.13,
      pointsRemaining: 3193,
    },
    noScaling: {
      pointsAwarded: 6545,
      pointsAwardedPercentage: 87.11,
      pointsRemaining: 799,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 85760,
      pointsAwardedPercentage: 93.55,
      pointsRemaining: 4000,
    },
    fourMonthScaling: {
      pointsAwarded: 60032,
      pointsAwardedPercentage: 93.55,
      pointsRemaining: 2800,
    },
    twoMonthScaling: {
      pointsAwarded: 34304,
      pointsAwardedPercentage: 93.55,
      pointsRemaining: 1600,
    },
    noScaling: {
      pointsAwarded: 8576,
      pointsAwardedPercentage: 93.55,
      pointsRemaining: 400,
    },
  },
} satisfies CategoryFixture;
