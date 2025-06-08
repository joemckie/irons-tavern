import { sub } from 'date-fns';
import { ScalingFixtureMap } from '../types';
import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';

export const generateScalingTests = <T extends CommonPointCalculatorData>(
  player: string,
  scalingFixtures: ScalingFixtureMap<T>,
  assertValues: (fixture: T) => void,
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

  it('Calculates the correct points - Three week scaling (17.50%)', () => {
    cy.visit(`/rank-calculator/${player}`);
    cy.setJoinDate(
      sub(new Date(), {
        days: 21,
      }),
      '17.50%',
    );

    assertValues(scalingFixtures.threeWeekScaling);
  });

  it('Calculates the correct points - No scaling (10%)', () => {
    cy.visit(`/rank-calculator/${player}`);
    cy.setJoinDate(new Date(), '10.00%');

    assertValues(scalingFixtures.noScaling);
  });
};
