import AppPage from '../page/AppPage';

describe('Projects', () => {
  beforeEach(() => {
    cy.visit('/app/dashboard');
  });

  it('starts with a starter project', () => {
    AppPage.sidebar().projects().click();
    cy.findByText(/TASK-1/i).should('exist');
    cy.findByText(/My First Planner Project/i).should('exist');
    cy.findByText(/My First Planner Project/i).click();

    cy.findByText(/TASK-2/i).should('exist');
    cy.findByText(/Setup Github repository/i).should('exist');
    cy.findByText(/Setup Github repository/i).click();

    cy.findAllByText(/Status/i).should('exist');
    cy.findAllByText(/Assignee/i).should('exist');
    cy.findAllByText(/Sprint/i).should('exist');
  });
});
