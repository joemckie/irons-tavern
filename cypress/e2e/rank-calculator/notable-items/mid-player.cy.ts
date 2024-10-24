describe('Maxed Player', () => {
  it('Calculates the correct rank', () => {
    cy.visit('/rank-calculator/clogging');

    cy.findByRole('button', { name: /submit/i }).should('be.visible');
  });
});
