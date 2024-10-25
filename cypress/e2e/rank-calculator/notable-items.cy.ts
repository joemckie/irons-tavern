import { notableItemsExpectedValues } from '@/cypress/fixtures/rank-calculator/notable-items-expected-values';
import { generateScalingTests } from '@/cypress/support/utils/generate-scaling-tests';

describe('Early-game player', () => {
  generateScalingTests(
    'riftletics',
    notableItemsExpectedValues.earlyGamePlayer,
    (fixture) => {
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
    },
  );
});

describe('Mid-game player', () => {
  generateScalingTests(
    'cousinofkos',
    notableItemsExpectedValues.midGamePlayer,
    (fixture) => {
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
    },
  );
});

describe('End-game player', () => {
  generateScalingTests(
    'clogging',
    notableItemsExpectedValues.endGamePlayer,
    (fixture) => {
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
    },
  );
});
