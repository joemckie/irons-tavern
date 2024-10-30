import { RankCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/use-rank-calculator';
import { Rank } from '@/config/enums';
import { CategoryFixture } from '@/cypress/support/types';

export const rankExpectedValues = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 30781,
      pointsAwardedPercentage: 0,
      pointsRemaining: 11219,
      rank: Rank.Willow as Rank as Rank,
      nextRank: Rank.Nature as Rank,
    },
    fourMonthScaling: {
      pointsAwarded: 21546,
      pointsAwardedPercentage: 0,
      pointsRemaining: 6454,
      rank: Rank.Earth as Rank,
      nextRank: Rank.Willow as Rank,
    },
    twoMonthScaling: {
      pointsAwarded: 12312,
      pointsAwardedPercentage: 0,
      pointsRemaining: 4688,
      rank: Rank.Oak as Rank,
      nextRank: Rank.Earth as Rank,
    },
    threeWeekScaling: {
      pointsAwarded: 5381,
      pointsAwardedPercentage: 0,
      pointsRemaining: 3619,
      rank: Rank.Water as Rank,
      nextRank: Rank.Oak as Rank,
    },
    noScaling: {
      pointsAwarded: 3078,
      pointsAwardedPercentage: 0,
      pointsRemaining: 5922,
      rank: Rank.Water as Rank,
      nextRank: Rank.Oak as Rank,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 111628,
      pointsAwardedPercentage: 0,
      pointsRemaining: 25372,
      rank: Rank.Yew as Rank,
      nextRank: Rank.Achiever as Rank,
    },
    fourMonthScaling: {
      pointsAwarded: 78139,
      pointsAwardedPercentage: 0,
      pointsRemaining: 1868,
      rank: Rank.Maple as Rank,
      nextRank: Rank.Law as Rank,
    },
    twoMonthScaling: {
      pointsAwarded: 44651,
      pointsAwardedPercentage: 0,
      pointsRemaining: 14349,
      rank: Rank.Nature as Rank,
      nextRank: Rank.Maple as Rank,
    },
    threeWeekScaling: {
      pointsAwarded: 19534,
      pointsAwardedPercentage: 0,
      pointsRemaining: 8466,
      rank: Rank.Earth as Rank,
      nextRank: Rank.Oak as Rank,
    },
    noScaling: {
      pointsAwarded: 11163,
      pointsAwardedPercentage: 0,
      pointsRemaining: 5838,
      rank: Rank.Oak as Rank,
      nextRank: Rank.Earth as Rank,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 243365,
      pointsAwardedPercentage: 0,
      pointsRemaining: 28635,
      rank: Rank.Diseased as Rank,
      nextRank: Rank.Blisterwood as Rank,
    },
    fourMonthScaling: {
      pointsAwarded: 170355,
      pointsAwardedPercentage: 0,
      pointsRemaining: 9645,
      rank: Rank.Achiever as Rank,
      nextRank: Rank.Elite as Rank,
    },
    twoMonthScaling: {
      pointsAwarded: 97346,
      pointsAwardedPercentage: 0,
      pointsRemaining: 8654,
      rank: Rank.Law as Rank,
      nextRank: Rank.Yew as Rank,
    },
    threeWeekScaling: {
      pointsAwarded: 42587,
      pointsAwardedPercentage: 0,
      pointsRemaining: 16413,
      rank: Rank.Willow as Rank,
      nextRank: Rank.Nature as Rank,
    },
    noScaling: {
      pointsAwarded: 24336,
      pointsAwardedPercentage: 0,
      pointsRemaining: 3664,
      rank: Rank.Earth as Rank,
      nextRank: Rank.Willow as Rank,
    },
  },
} satisfies CategoryFixture<RankCalculatorData>;
