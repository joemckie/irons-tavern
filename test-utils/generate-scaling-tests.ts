import { sub } from 'date-fns';
import { CommonPointCalculatorData, FormData } from '@/types/rank-calculator';

type ScalingFixtureMap<T extends CommonPointCalculatorData> = Record<
  'fullScaling' | 'fourMonthScaling' | 'twoMonthScaling' | 'noScaling',
  T
>;

export const generateScalingTests = <T extends CommonPointCalculatorData>(
  formData: FormData,
  scalingFixtures: ScalingFixtureMap<T>,
  testRunner: (formFixture: FormData, resultFixture: T) => void,
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
