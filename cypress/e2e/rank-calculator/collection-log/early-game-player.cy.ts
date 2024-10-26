import { collectionLogExpectedValues } from '@/fixtures/rank-calculator/collection-log-expected-values';
import { generateScalingTests } from '@/cypress/support/utils/generate-scaling-tests';

describe('Collection Log - Early-game player', () => {
  generateScalingTests(
    'riftletics',
    collectionLogExpectedValues.earlyGamePlayer,
    (fixture) => {
      cy.findByLabelText(/^total collection log points$/i).should(
        'have.text',
        `${fixture.pointsAwarded}`,
      );

      cy.findByLabelText(/^collection log slot points$/i).should(
        'have.text',
        `${fixture.collectionLogSlotPoints}`,
      );

      cy.findByLabelText(
        /^collection log point completion percentage$/i,
      ).should('have.text', fixture.pointsAwardedPercentage);

      cy.findByLabelText(/^collection log points remaining$/i).should(
        'have.text',
        `(${fixture.pointsRemaining})`,
      );
    },
  );
});
