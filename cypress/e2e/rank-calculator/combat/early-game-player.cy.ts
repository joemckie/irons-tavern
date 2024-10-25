import { combatExpectedValues } from '@/cypress/fixtures/rank-calculator/combat-expected-values';
import { generateScalingTests } from '@/cypress/support/utils/generate-scaling-tests';

describe('Combat - Early-game player', () => {
  generateScalingTests(
    'riftletics',
    combatExpectedValues.earlyGamePlayer,
    (fixture) => {
      cy.findByLabelText(/^total combat points$/i).should(
        'have.text',
        `${fixture.pointsAwarded}`,
      );

      cy.findByLabelText(/^ehb points$/i).should(
        'have.text',
        `${fixture.ehbPoints}`,
      );

      cy.findByLabelText(/^ca tier points$/i).should(
        'have.text',
        `${fixture.caTierPoints}`,
      );

      cy.findByLabelText(/^combat point completion percentage$/i).should(
        'have.text',
        fixture.pointsAwardedPercentage,
      );

      cy.findByLabelText(/^combat points remaining$/i).should(
        'have.text',
        `(${fixture.pointsRemaining})`,
      );
    },
  );
});
