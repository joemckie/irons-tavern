import { notableItemsExpectedValues } from '@/cypress/fixtures/rank-calculator/notable-items-expected-values';
import { ScalingTestMap } from '@/cypress/support/types';

describe('Early-game player', () => {
  const testCases = [
    [
      'Full scaling (100%)',
      notableItemsExpectedValues.earlyGamePlayer.fullScaling,
    ],
  ] as ScalingTestMap;

  testCases.forEach(([label, fixture]) => {
    it(`calculates the correct points - ${label}`, () => {
      cy.visit('/rank-calculator/riftletics');

      cy.findByLabelText(/^notable items total points$/i).should(
        'have.text',
        `${fixture.pointsAwarded}`,
      );

      cy.findByLabelText(/^notable items point completion percentage$/i).should(
        'have.text',
        `${fixture.pointsAwardedPercentage}%`,
      );

      cy.findByLabelText(/^notable items points remaining$/i).should(
        'have.text',
        `(${fixture.pointsRemaining})`,
      );

      cy.findByLabelText(/^notable items collected$/i).should('have.text', '5');

      cy.findByLabelText(/^total notable items available$/i).should(
        'have.text',
        '295',
      );

      cy.findByLabelText(/^notable items collected percentage$/i).should(
        'have.text',
        '1.69%',
      );
    });
  });
});

describe('Mid-game player', () => {
  const testCases = [
    [
      'Full scaling (100%)',
      notableItemsExpectedValues.midGamePlayer.fullScaling,
    ],
  ] as ScalingTestMap;

  testCases.forEach(([label, fixture]) => {
    it(`calculates the correct points - ${label}`, () => {
      cy.visit('/rank-calculator/cousinofkos');

      cy.findByLabelText(/^notable items total points$/i).should(
        'have.text',
        `${fixture.pointsAwarded}`,
      );

      cy.findByLabelText(/^notable items point completion percentage$/i).should(
        'have.text',
        `${fixture.pointsAwardedPercentage}%`,
      );

      cy.findByLabelText(/^notable items points remaining$/i).should(
        'have.text',
        `(${fixture.pointsRemaining})`,
      );

      cy.findByLabelText(/^notable items collected$/i).should(
        'have.text',
        '99',
      );

      cy.findByLabelText(/^total notable items available$/i).should(
        'have.text',
        '295',
      );

      cy.findByLabelText(/^notable items collected percentage$/i).should(
        'have.text',
        '33.56%',
      );
    });
  });
});

describe('End-game player', () => {
  const testCases = [
    [
      'Full scaling (100%)',
      notableItemsExpectedValues.endGamePlayer.fullScaling,
    ],
  ] as ScalingTestMap;

  testCases.forEach(([label, fixture]) => {
    it(`calculates the correct points - ${label}`, () => {
      cy.visit('/rank-calculator/clogging');

      cy.findByLabelText(/^notable items total points$/i).should(
        'have.text',
        `${fixture.pointsAwarded}`,
      );

      cy.findByLabelText(/^notable items point completion percentage$/i).should(
        'have.text',
        `${fixture.pointsAwardedPercentage}%`,
      );

      cy.findByLabelText(/^notable items points remaining$/i).should(
        'have.text',
        `(${fixture.pointsRemaining})`,
      );

      cy.findByLabelText(/^notable items collected$/i).should(
        'have.text',
        '212',
      );

      cy.findByLabelText(/^total notable items available$/i).should(
        'have.text',
        '295',
      );

      cy.findByLabelText(/^notable items collected percentage$/i).should(
        'have.text',
        '71.86%',
      );
    });
  });
});
