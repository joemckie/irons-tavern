import { skillingExpectedValues } from '@/fixtures/rank-calculator/skilling-expected-values';
import { generateScalingTests } from '@/cypress/support/utils/generate-scaling-tests';

describe('Skilling - Mid-game player', () => {
  generateScalingTests(
    'cousinofkos',
    skillingExpectedValues.midGamePlayer,
    (fixture) => {
      cy.findByLabelText(/^total skilling points$/i).should(
        'have.text',
        `${fixture.pointsAwarded}`,
      );

      cy.findByLabelText(/^ehp points$/i).should(
        'have.text',
        `${fixture.ehpPoints}`,
      );

      cy.findByLabelText(/^total level points$/i).should(
        'have.text',
        `${fixture.totalLevelPoints}`,
      );

      Object.entries(fixture.achievementDiariesPoints).forEach(
        ([location, points]) => {
          const matcher = new RegExp(`${location} diary points`, 'i');

          cy.findByLabelText(matcher).should('have.text', `${points}`);
        },
      );

      cy.findByLabelText(/^skilling point completion percentage$/i).should(
        'have.text',
        fixture.pointsAwardedPercentage,
      );

      cy.findByLabelText(/^skilling points remaining$/i).should(
        'have.text',
        `(${fixture.pointsRemaining})`,
      );
    },
  );
});
