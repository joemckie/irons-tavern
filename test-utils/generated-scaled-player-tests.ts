import { CommonPointCalculatorData, FormData } from '@/types/rank-calculator';
import { generateScalingTests } from './generate-scaling-tests';

interface FormDataMap {
  earlyGamePlayer: FormData;
  midGamePlayer: FormData;
  endGamePlayer: FormData;
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
  testRunner: (formFixture: FormData, resultFixture: T) => void,
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

  describe('Late-game player', () => {
    generateScalingTests(
      formData.endGamePlayer,
      scalingFixtures.endGamePlayer,
      testRunner,
    );
  });
};
