import { sub } from 'date-fns';
import { CommonPointCalculatorData } from '@/types/rank-calculator';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';

type ScalingFixtureMap<T extends CommonPointCalculatorData> = Record<
  | 'fullScaling'
  | 'fourMonthScaling'
  | 'twoMonthScaling'
  | 'threeWeekScaling'
  | 'noScaling',
  T
>;

export const generateScalingTests = <T extends CommonPointCalculatorData>(
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>,
  scalingFixtures: ScalingFixtureMap<T>,
  testRunner: (
    formFixture: Omit<RankCalculatorSchema, 'rank' | 'points'>,
    resultFixture: T,
  ) => void,
) => {
  describe('Full scaling (100%)', () => {
    testRunner(
      {
        ...formData,
        joinDate: sub(new Date(), {
          days: 180,
        }),
      },
      scalingFixtures.fullScaling,
    );
  });

  describe('Four month scaling (70%)', () => {
    testRunner(
      {
        ...formData,
        joinDate: sub(new Date(), {
          days: 120,
        }),
      },
      scalingFixtures.fourMonthScaling,
    );
  });

  describe('Two month scaling (40%)', () => {
    testRunner(
      {
        ...formData,
        joinDate: sub(new Date(), {
          days: 60,
        }),
      },
      scalingFixtures.twoMonthScaling,
    );
  });

  describe('Three week scaling (17.50%)', () => {
    testRunner(
      {
        ...formData,
        joinDate: sub(new Date(), {
          days: 21,
        }),
      },
      scalingFixtures.threeWeekScaling,
    );
  });

  describe('No scaling (10%)', () => {
    testRunner(
      {
        ...formData,
        joinDate: new Date(),
      },
      scalingFixtures.noScaling,
    );
  });
};
