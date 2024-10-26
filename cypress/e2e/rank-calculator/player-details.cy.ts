describe('Player details', () => {
  it('displays the player name', () => {
    cy.visit('/rank-calculator/riftletics');
    cy.findByLabelText(/^player name$/i).should('have.text', 'Riftletics');

    cy.visit('/rank-calculator/cousinofkos');
    cy.findByLabelText(/^player name$/i).should('have.text', 'CousinOfKos');

    cy.visit('/rank-calculator/clogging');
    cy.findByLabelText(/^player name$/i).should('have.text', 'Clogging');
  });
});
