import { CommonPointCalculatorData } from '@/types/rank-calculator';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { generateScalingTests } from './generate-scaling-tests';

interface FormDataMap {
  earlyGamePlayer: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  midGamePlayer: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  endGamePlayer: Omit<RankCalculatorSchema, 'rank' | 'points'>;
}

type ScalingFixtureMap<T extends CommonPointCalculatorData> = Record<
  | 'fullScaling'
  | 'fourMonthScaling'
  | 'twoMonthScaling'
  | 'threeWeekScaling'
  | 'noScaling',
  T
>;

type CategoryFixture<T extends CommonPointCalculatorData> = {
  earlyGamePlayer: ScalingFixtureMap<T>;
  midGamePlayer: ScalingFixtureMap<T>;
  endGamePlayer: ScalingFixtureMap<T>;
};

export const generateScaledPlayerTests = <T extends CommonPointCalculatorData>(
  formData: FormDataMap,
  scalingFixtures: CategoryFixture<T>,
  testRunner: (
    formFixture: Omit<RankCalculatorSchema, 'rank' | 'points'>,
    resultFixture: T,
  ) => void,
) => {
  describe('Early-game player', () => {
    generateScalingTests(
      formData.earlyGamePlayer,
      scalingFixtures.earlyGamePlayer,
      testRunner,
    );
  });

  describe('Mid-game player', () => {
    generateScalingTests(
      formData.midGamePlayer,
      scalingFixtures.midGamePlayer,
      testRunner,
    );
  });

  describe('End-game player', () => {
    generateScalingTests(
      formData.endGamePlayer,
      scalingFixtures.endGamePlayer,
      testRunner,
    );
  });
};
