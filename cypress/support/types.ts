import { CommonPointCalculatorData } from '@/types/rank-calculator';

export type ScalingFixtureMap<T extends CommonPointCalculatorData> = Record<
  'fullScaling' | 'fourMonthScaling' | 'twoMonthScaling' | 'noScaling',
  T
>;

export type CategoryFixture<T extends CommonPointCalculatorData> = {
  earlyGamePlayer: ScalingFixtureMap<T>;
  midGamePlayer: ScalingFixtureMap<T>;
  endGamePlayer: ScalingFixtureMap<T>;
};
