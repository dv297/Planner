import AppPage from '../page/AppPage';

describe('Sprints', () => {
  beforeEach(() => {
    cy.visit('/app/dashboard');
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

    // Allows you to drag when the accordion is open
    cy.findByText(/Setup Github repository/i).drag(
      '#sprint-drag-overlay-0-body'
    );

    cy.findByText(/Moved issue to Test Sprint/i).should('exist');
    cy.findByTestId('sprint-accordion-0').within(() => {
      cy.findByText(/Setup Github repository/i).should('exist');
    });

    // Allows you to drag when the accordion is closed
    cy.get('#sprint-drag-overlay-0-title').click();
    cy.findByText(/TASK-3/i).drag('#sprint-drag-overlay-0-title');

    cy.findByText(/Moved issue to Test Sprint/i).should('exist');

    // Reopen accordion
    cy.get('#sprint-drag-overlay-0-title').click();
    cy.findByTestId('sprint-accordion-0').within(() => {
      cy.findByText(/Setup Github repository/i).should('exist');
    });

    // Allows you to move to backlog while backlog is open
    cy.findByText(/Setup Github repository/i).drag(
      '#backlog-drag-overlay-body'
    );
    cy.findByText(/Moved issue to backlog/i).should('exist');
    cy.findByTestId('sprint-accordion-0').within(() => {
      cy.findByText(/Setup Github repository/i).should('not.exist');
    });
    cy.findByTestId('backlog-accordion').within(() => {
      cy.findByText(/Setup Github repository/i).should('exist');
    });

    // Allows you to move to backlog while backlog is closed
    // Close backlog
    cy.findByText(/Backlog/i).click();
    cy.findByText(/TASK-3/i).drag('#backlog-drag-overlay-title');
    // Reopen backlog
    cy.findByText(/Backlog/i).click();
    cy.findByTestId('backlog-accordion').within(() => {
      cy.findByText(/TASK-3/i).should('exist');
    });
  });
});
