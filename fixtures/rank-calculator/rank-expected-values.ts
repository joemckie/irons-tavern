import { RankCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/use-rank-calculator';
import { CategoryFixture } from '@/cypress/support/types';

export const rankExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 30781,
      pointsAwardedPercentage: 0,
      pointsRemaining: 11219,
      rank: 'Willow',
      nextRank: 'Nature',
    },
    fourMonthScaling: {
      pointsAwarded: 21546,
      pointsAwardedPercentage: 0,
      pointsRemaining: 6454,
      rank: 'Earth',
      nextRank: 'Willow',
    },
    twoMonthScaling: {
      pointsAwarded: 12312,
      pointsAwardedPercentage: 0,
      pointsRemaining: 4688,
      rank: 'Oak',
      nextRank: 'Earth',
    },
    threeWeekScaling: {
      pointsAwarded: 5381,
      pointsAwardedPercentage: 0,
      pointsRemaining: 3619,
      rank: 'Water',
      nextRank: 'Oak',
    },
    noScaling: {
      pointsAwarded: 3078,
      pointsAwardedPercentage: 0,
      pointsRemaining: 5922,
      rank: 'Water',
      nextRank: 'Oak',
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 111628,
      pointsAwardedPercentage: 0,
      pointsRemaining: 25372,
      rank: 'Yew',
      nextRank: 'Achiever',
    },
    fourMonthScaling: {
      pointsAwarded: 78139,
      pointsAwardedPercentage: 0,
      pointsRemaining: 1861,
      rank: 'Maple',
      nextRank: 'Law',
    },
    twoMonthScaling: {
      pointsAwarded: 44651,
      pointsAwardedPercentage: 0,
      pointsRemaining: 14349,
      rank: 'Nature',
      nextRank: 'Maple',
    },
    threeWeekScaling: {
      pointsAwarded: 19534,
      pointsAwardedPercentage: 0,
      pointsRemaining: 8466,
      rank: 'Earth',
      nextRank: 'Willow',
    },
    noScaling: {
      pointsAwarded: 11162,
      pointsAwardedPercentage: 0,
      pointsRemaining: 5838,
      rank: 'Oak',
      nextRank: 'Earth',
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 243365,
      pointsAwardedPercentage: 0,
      pointsRemaining: 28635,
      rank: 'Diseased',
      nextRank: 'Blisterwood',
    },
    fourMonthScaling: {
      pointsAwarded: 170355,
      pointsAwardedPercentage: 0,
      pointsRemaining: 9645,
      rank: 'Achiever',
      nextRank: 'Elite',
    },
    twoMonthScaling: {
      pointsAwarded: 97346,
      pointsAwardedPercentage: 0,
      pointsRemaining: 8654,
      rank: 'Law',
      nextRank: 'Yew',
    },
    threeWeekScaling: {
      pointsAwarded: 42587,
      pointsAwardedPercentage: 0,
      pointsRemaining: 16413,
      rank: 'Nature',
      nextRank: 'Maple',
    },
    noScaling: {
      pointsAwarded: 24336,
      pointsAwardedPercentage: 0,
      pointsRemaining: 3664,
      rank: 'Earth',
      nextRank: 'Willow',
    },
  },
} satisfies CategoryFixture<RankCalculatorData>;
