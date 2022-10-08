import AppPage from '../page/AppPage';

describe('Workspace', () => {
  beforeEach(() => {
    cy.visit('/app/dashboard');
  });

  it('allows you to add a workspace', () => {
    AppPage.workspaceSelector().click();
    AppPage.addWorkspaceButton().click();

    AppPage.addWorkspaceForm().nameForm().type('DVU TEST WORKSPACE');
    AppPage.addWorkspaceForm().tagForm().type('DVUTEST');

    AppPage.addWorkspaceForm().submitButton().click();

    cy.findByText(/Successfully added workspace/i).should('exist');

    cy.url().should('include', '/app/dashboard');
    cy.findByText(/DVU TEST WORKSPACE/i).should('exist');
  });
});
