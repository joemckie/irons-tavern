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
      pointsAwarded: 15640,
      pointsAwardedPercentage: 0,
      pointsRemaining: 45320,
      rank: Rank.Yew as Rank,
      nextRank: Rank.Achiever as Rank,
    },
    fourMonthScaling: {
      pointsAwarded: 10948,
      pointsAwardedPercentage: 0,
      pointsRemaining: 31724,
      rank: Rank.Maple as Rank,
      nextRank: Rank.Law as Rank,
    },
    twoMonthScaling: {
      pointsAwarded: 6256,
      pointsAwardedPercentage: 0,
      pointsRemaining: 18128,
      rank: Rank.Nature as Rank,
      nextRank: Rank.Maple as Rank,
    },
    threeWeekScaling: {
      pointsAwarded: 19534,
      pointsAwardedPercentage: 0,
      pointsRemaining: 9466,
      rank: Rank.Earth as Rank,
      nextRank: Rank.Oak as Rank,
    },
    noScaling: {
      pointsAwarded: 1564,
      pointsAwardedPercentage: 0,
      pointsRemaining: 4532,
      rank: Rank.Oak as Rank,
      nextRank: Rank.Earth as Rank,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 46340,
      pointsAwardedPercentage: 0,
      pointsRemaining: 14620,
      rank: Rank.Diseased as Rank,
      nextRank: Rank.Blisterwood as Rank,
    },
    fourMonthScaling: {
      pointsAwarded: 32438,
      pointsAwardedPercentage: 0,
      pointsRemaining: 10234,
      rank: Rank.Achiever as Rank,
      nextRank: Rank.Elite as Rank,
    },
    twoMonthScaling: {
      pointsAwarded: 18536,
      pointsAwardedPercentage: 0,
      pointsRemaining: 5848,
      rank: Rank.Law as Rank,
      nextRank: Rank.Yew as Rank,
    },
    threeWeekScaling: {
      pointsAwarded: 42220,
      pointsAwardedPercentage: 0,
      pointsRemaining: 780,
      rank: Rank.Willow as Rank,
      nextRank: Rank.Nature as Rank,
    },
    noScaling: {
      pointsAwarded: 4634,
      pointsAwardedPercentage: 0,
      pointsRemaining: 1462,
      rank: Rank.Earth as Rank,
      nextRank: Rank.Willow as Rank,
    },
  },
} satisfies CategoryFixture<RankCalculatorData>;
