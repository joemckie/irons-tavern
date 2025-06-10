import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';

export type ScalingFixtureMap<T extends CommonPointCalculatorData> = Record<
  | 'fullScaling'
  | 'fourMonthScaling'
  | 'twoMonthScaling'
  | 'threeWeekScaling'
  | 'noScaling',
  T
>;

export interface CategoryFixture<T extends CommonPointCalculatorData> {
  earlyGamePlayer: ScalingFixtureMap<T>;
  midGamePlayer: ScalingFixtureMap<T>;
  endGamePlayer: ScalingFixtureMap<T>;
}
