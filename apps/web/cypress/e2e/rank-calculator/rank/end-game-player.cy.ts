import { generateScalingTests } from '@/cypress/support/utils/generate-scaling-tests';
import { rankExpectedValues } from '@/fixtures/rank-calculator/rank-expected-values';

describe('Collection Log - End-game player', () => {
  generateScalingTests(
    'clogging',
    rankExpectedValues.endGamePlayer,
    (fixture) => {
      cy.findByLabelText(/^total points$/i).should(
        'have.text',
        `${fixture.pointsAwarded}`,
      );

      cy.findByLabelText(/^points to next rank$/i).should(
        'have.text',
        `(${fixture.pointsRemaining})`,
      );

      cy.findByLabelText(/^current rank$/i).should('have.text', fixture.rank);

      cy.findByAltText(`${fixture.rank} icon`)
        .should('have.attr', 'src')
        .should('include', `${fixture.rank.toLowerCase()}.png`);

      cy.findByLabelText(/^next rank$/i).should('have.text', fixture.nextRank);

      cy.findByAltText(`${fixture.nextRank} icon`)
        .should('have.attr', 'src')
        .should('include', `${fixture.nextRank.toLowerCase()}.png`);

      cy.findByLabelText(
        /^collection log point completion percentage$/i,
      ).should('have.text', fixture.pointsAwardedPercentage);
    },
  );
});
