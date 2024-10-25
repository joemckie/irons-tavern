/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';
import { format } from 'date-fns';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      setJoinDate(date: Date, expectedScaling: string): void;
    }
  }
}

Cypress.Commands.add('setJoinDate', (date, expectedScaling) => {
  const joinDateInput = cy.findByRole('textbox', { name: /join date/i });
  const formattedDate = format(date, 'dd-MM-yyyy');

  joinDateInput.clear().type(formattedDate).should('have.value', formattedDate);

  // Hide the datepicker
  cy.get('body').click();

  cy.findByLabelText(/point scaling/i).should('have.text', expectedScaling);
});
