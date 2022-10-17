describe('Issue', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/app/issue/TASK-2');
  });

  it('allows you to change the status', () => {
    cy.findAllByText(/Status/i).should('exist');

    cy.findByRole('button', { name: /status toggle menu/i })
      .should('have.text', 'Planning')
      .click();
    cy.findByText('In Progress').click();

    cy.findByRole('button', { name: /status toggle menu/i }).should(
      'have.text',
      'In Progress'
    );

    cy.visit('/app/issue/TASK-2');

    cy.findByRole('button', { name: /status toggle menu/i }).should(
      'have.text',
      'In Progress'
    );
  });

  it('allows you to change the assignee', () => {
    cy.findAllByText(/Assignee/i).should('exist');

    cy.findByRole('button', { name: /assignee toggle menu/i })
      .should('have.text', 'Select...')
      .click();
    cy.findByText('Daniel Vu').click();

    cy.findByRole('button', { name: /assignee toggle menu/i }).should(
      'have.text',
      'Daniel Vu'
    );

    cy.visit('/app/issue/TASK-2');

    cy.findByRole('button', { name: /assignee toggle menu/i }).should(
      'have.text',
      'Daniel Vu'
    );
  });
});
