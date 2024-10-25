import { sub } from 'date-fns';
import { CategoryPointCalculatorData } from '@/types/rank-calculator';
import { ScalingFixtureMap } from '../types';

export const generateScalingTests = (
  player: string,
  scalingFixtures: ScalingFixtureMap,
  assertValues: (fixture: CategoryPointCalculatorData) => void,
) => {
  it('Calculates the correct points - Full scaling (100%)', () => {
    cy.visit(`/rank-calculator/${player}`);
    cy.setJoinDate(
      sub(new Date(), {
        months: 6,
      }),
      '100.00%',
    );
    assertValues(scalingFixtures.fullScaling);
  });
  it.skip('Calculates the correct points - Four month scaling (70%)');
  it.skip('Calculates the correct points - Two month scaling (40%)');
  it.skip('Calculates the correct points - No scaling (10%)');
};
