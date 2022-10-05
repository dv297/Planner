import AppPage from '../page/AppPage';

describe('Sprints', () => {
  beforeEach(() => {
    cy.exec('node scripts/seed-database.js');
    cy.visit('/');

    cy.login();
  });

  it('allows you to add a sprint', () => {
    AppPage.sidebar().sprints().click();

    cy.findByText(/Add a Sprint/i).should('exist');
    cy.findByText(/Add a Sprint/i).click();

    AppPage.addSprintForm().nameForm().type('Test Sprint');
    cy.findByText(/Submit/i).click();

    cy.findByText(/Created sprint!/i).should('exist');
    cy.findByText(/Test Sprint/i).should('exist');

    cy.findByText(/Test Sprint/i).click();
    cy.findByText(/No issues assigned to this sprint yet/i).should('exist');

    cy.findByText(/Backlog/i).should('exist');
    cy.findByText(/Backlog/i).click();

    cy.findByText(/Setup Github repository/i).should('exist');

    cy.findByText(/Setup Github repository/i).drag('#sprint-drag-overlay-0');

    cy.findByText(/Moved issue to Test Sprint/i).should('exist');
    cy.findByTestId('sprint-accordion-0').within(() => {
      cy.findByText(/Setup Github repository/i).should('exist');
    });
  });
});
