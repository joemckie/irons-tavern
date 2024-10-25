import { CategoryPointCalculatorData } from '@/types/rank-calculator';

type ScalingFixture = Record<
  'fullScaling' | 'fourMonthScaling' | 'twoMonthScaling' | 'noScaling',
  CategoryPointCalculatorData
>;

export type ScalingTestMap = [
  (
    | 'Full scaling (100%)'
    | 'Four month scaling (70%)'
    | 'Two month scaling (40%)'
    | 'No scaling (10%)'
  ),
  CategoryPointCalculatorData,
][];

export type CategoryFixture = {
  earlyGamePlayer: ScalingFixture;
  midGamePlayer: ScalingFixture;
  endGamePlayer: ScalingFixture;
};
