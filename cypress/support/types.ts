import { CategoryPointCalculatorData } from '@/types/rank-calculator';

type ScalingFixture = Record<'fullScaling', CategoryPointCalculatorData>;

export type CategoryFixture = {
  earlyGamePlayer: ScalingFixture;
  midGamePlayer: ScalingFixture;
  endGamePlayer: ScalingFixture;
};
