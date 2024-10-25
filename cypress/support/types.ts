import { CategoryPointCalculatorData } from '@/types/rank-calculator';

export type ScalingFixtureMap = Record<
  'fullScaling' | 'fourMonthScaling' | 'twoMonthScaling' | 'noScaling',
  CategoryPointCalculatorData
>;

export type CategoryFixture = {
  earlyGamePlayer: ScalingFixtureMap;
  midGamePlayer: ScalingFixtureMap;
  endGamePlayer: ScalingFixtureMap;
};
