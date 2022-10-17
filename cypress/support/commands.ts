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
/*  eslint-disable @typescript-eslint/no-namespace */

import '@testing-library/cypress/add-commands';
import '@4tw/cypress-drag-drop';

before(() => {
  cy.exec('node scripts/seed-database.js');
});

Cypress.Commands.add('login', () => {
  cy.session(
    'name',
    () => {
      cy.visit('/');

      cy.findByText(/Sign in/i).click();
      cy.findByLabelText(/Username/i).type('dvv297@gmail.com');
      cy.findByText(/Sign in with Credentials/i).click();
      cy.findByText(/We have set up some resources to help you get started./i, {
        timeout: 10000,
      }).should('exist');
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<Element>;
      databaseReset(): Chainable<Element>;
    }
  }
}
