/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

import AppPage from '../page/AppPage';

describe('Workspace', () => {
  beforeEach(() => {
    cy.exec('node scripts/seed-database.js');
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/');

    // TODO: Refactor to not perform log in every time
    cy.login();
  });

  it('allows you to add a workspace', () => {
    AppPage.workspaceSelector().click();
    AppPage.addWorkspaceButton().click();

    AppPage.addWorkspaceForm().nameForm().type('DVU TEST WORKSPACE');
    AppPage.addWorkspaceForm().tagForm().type('DVUTEST');

    AppPage.addWorkspaceForm().submitButton().click();

    cy.findByText(/Successfully added workspace/i).should('exist');

    cy.visit('/app/dashboard');

    AppPage.workspaceSelector().click();
    cy.findByText(/DVU TEST WORKSPACE/i).should('exist');
  });
});
