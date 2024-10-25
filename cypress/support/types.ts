import { CategoryPointCalculatorData } from '@/types/rank-calculator';

// Percentage doesn't scale as the total points is scaled
export type ScalingFixture = Pick<
  CategoryPointCalculatorData,
  'pointsAwarded' | 'pointsRemaining'
>;

export type ScalingFixtureMap = Record<
  'fullScaling' | 'fourMonthScaling' | 'twoMonthScaling' | 'noScaling',
  ScalingFixture
>;

export type CategoryFixture = {
  earlyGamePlayer: ScalingFixtureMap;
  midGamePlayer: ScalingFixtureMap;
  endGamePlayer: ScalingFixtureMap;
};
