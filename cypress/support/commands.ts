/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  cy.findByText(/Sign in/i).click();
  cy.findByLabelText(/Username/i).type('dvv297@gmail.com');
  cy.findByText(/Sign in with Credentials/i).click();
  cy.findByText(/We have set up some resources to help you get started./i, {
    timeout: 10000,
  }).should('exist');
});

//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

/*  eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<Element>;
    }
  }
}
