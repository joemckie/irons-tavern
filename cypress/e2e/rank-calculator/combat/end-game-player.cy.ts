import { combatExpectedValues } from '@/fixtures/rank-calculator/combat-expected-values';
import { generateScalingTests } from '@/cypress/support/utils/generate-scaling-tests';

describe('Combat - End-game player', () => {
  generateScalingTests(
    'clogging',
    combatExpectedValues.endGamePlayer,
    (fixture) => {
      cy.findByLabelText(/^total combat points$/i).should(
        'have.text',
        `${fixture.pointsAwarded}`,
      );

      cy.findByLabelText(/^efficient hours bossed points$/i).should(
        'have.text',
        `${fixture.ehbPoints}`,
      );

      cy.findByLabelText(/^combat achievement tier points$/i).should(
        'have.text',
        `${fixture.combatAchievementTierPoints}`,
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
