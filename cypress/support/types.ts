import { CategoryPointCalculatorData } from '@/types/rank-calculator';

type ScalingFixture = Record<
  'fullScaling' | 'halfScaling' | 'quarterScaling',
  CategoryPointCalculatorData
>;

export type ScalingTestMap = [
  '100% scaling' | '50% scaling' | '25% scaling',
  CategoryPointCalculatorData,
][];

export type CategoryFixture = {
  earlyGamePlayer: ScalingFixture;
  midGamePlayer: ScalingFixture;
  endGamePlayer: ScalingFixture;
};
