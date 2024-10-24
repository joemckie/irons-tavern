describe('New clan joiner', () => {
  it.skip('calculates the correct points');
});

describe('Early-game player', () => {
  it('calculates the correct points', () => {
    cy.visit('/rank-calculator/riftletics');

    cy.findByLabelText(/^notable items total points$/i).should(
      'have.text',
      '520',
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
    cy.findByLabelText(/^notable items point completion percentage$/i).should(
      'have.text',
      '0.95%',
    );
    cy.findByLabelText(/^notable items points remaining$/i).should(
      'have.text',
      '(54320)',
    );
  });
});

describe('Mid-game player', () => {
  it('calculates the correct points', () => {
    cy.visit('/rank-calculator/cousinofkos');

    cy.findByLabelText(/^notable items total points$/i).should(
      'have.text',
      '5290',
    );
    cy.findByLabelText(/^notable items collected$/i).should('have.text', '99');
    cy.findByLabelText(/^total notable items available$/i).should(
      'have.text',
      '295',
    );
    cy.findByLabelText(/^notable items collected percentage$/i).should(
      'have.text',
      '33.56%',
    );
    cy.findByLabelText(/^notable items point completion percentage$/i).should(
      'have.text',
      '9.65%',
    );
    cy.findByLabelText(/^notable items points remaining$/i).should(
      'have.text',
      '(49550)',
    );
  });
});

describe('Late-game player', () => {
  it.skip('calculates the correct points');
});
