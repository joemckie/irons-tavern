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
        days: 180,
      }),
      '100.00%',
    );

    assertValues(scalingFixtures.fullScaling);
  });

  it('Calculates the correct points - Four month scaling (70%)', () => {
    cy.visit(`/rank-calculator/${player}`);
    cy.setJoinDate(
      sub(new Date(), {
        days: 120,
      }),
      '70.00%',
    );

    assertValues(scalingFixtures.fourMonthScaling);
  });

  it('Calculates the correct points - Two month scaling (40%)', () => {
    cy.visit(`/rank-calculator/${player}`);
    cy.setJoinDate(
      sub(new Date(), {
        days: 60,
      }),
      '40.00%',
    );

    assertValues(scalingFixtures.twoMonthScaling);
  });

  it('Calculates the correct points - No scaling (10%)', () => {
    cy.visit(`/rank-calculator/${player}`);
    cy.setJoinDate(new Date(), '10.00%');

    assertValues(scalingFixtures.noScaling);
  });
};
