import { RankCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/use-rank-calculator';
import { Rank } from '@/config/enums';
import { CategoryFixture } from '@/cypress/support/types';

export const rankExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 30781,
      pointsAwardedPercentage: 0,
      pointsRemaining: 11219,
      rank: 'Willow' as Rank,
      nextRank: 'Nature' as Rank,
    },
    fourMonthScaling: {
      pointsAwarded: 21546,
      pointsAwardedPercentage: 0,
      pointsRemaining: 6454,
      rank: 'Earth' as Rank,
      nextRank: 'Willow' as Rank,
    },
    twoMonthScaling: {
      pointsAwarded: 12312,
      pointsAwardedPercentage: 0,
      pointsRemaining: 4688,
      rank: 'Oak' as Rank,
      nextRank: 'Earth' as Rank,
    },
    threeWeekScaling: {
      pointsAwarded: 5381,
      pointsAwardedPercentage: 0,
      pointsRemaining: 3619,
      rank: 'Water' as Rank,
      nextRank: 'Oak' as Rank,
    },
    noScaling: {
      pointsAwarded: 3078,
      pointsAwardedPercentage: 0,
      pointsRemaining: 5922,
      rank: 'Water' as Rank,
      nextRank: 'Oak' as Rank,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 111628,
      pointsAwardedPercentage: 0,
      pointsRemaining: 25372,
      rank: 'Yew' as Rank,
      nextRank: 'Achiever' as Rank,
    },
    fourMonthScaling: {
      pointsAwarded: 78139,
      pointsAwardedPercentage: 0,
      pointsRemaining: 1861,
      rank: 'Maple' as Rank,
      nextRank: 'Law' as Rank,
    },
    twoMonthScaling: {
      pointsAwarded: 44651,
      pointsAwardedPercentage: 0,
      pointsRemaining: 14349,
      rank: 'Nature' as Rank,
      nextRank: 'Maple' as Rank,
    },
    threeWeekScaling: {
      pointsAwarded: 19534,
      pointsAwardedPercentage: 0,
      pointsRemaining: 8466,
      rank: 'Earth' as Rank,
      nextRank: 'Willow' as Rank,
    },
    noScaling: {
      pointsAwarded: 11162,
      pointsAwardedPercentage: 0,
      pointsRemaining: 5838,
      rank: 'Oak' as Rank,
      nextRank: 'Earth' as Rank,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 243365,
      pointsAwardedPercentage: 0,
      pointsRemaining: 28635,
      rank: 'Diseased' as Rank,
      nextRank: 'Blisterwood' as Rank,
    },
    fourMonthScaling: {
      pointsAwarded: 170355,
      pointsAwardedPercentage: 0,
      pointsRemaining: 9645,
      rank: 'Achiever' as Rank,
      nextRank: 'Elite' as Rank,
    },
    twoMonthScaling: {
      pointsAwarded: 97346,
      pointsAwardedPercentage: 0,
      pointsRemaining: 8654,
      rank: 'Law' as Rank,
      nextRank: 'Yew' as Rank,
    },
    threeWeekScaling: {
      pointsAwarded: 42587,
      pointsAwardedPercentage: 0,
      pointsRemaining: 16413,
      rank: 'Nature' as Rank,
      nextRank: 'Maple' as Rank,
    },
    noScaling: {
      pointsAwarded: 24336,
      pointsAwardedPercentage: 0,
      pointsRemaining: 3664,
      rank: 'Earth' as Rank,
      nextRank: 'Willow' as Rank,
    },
  },
} satisfies CategoryFixture<RankCalculatorData>;
