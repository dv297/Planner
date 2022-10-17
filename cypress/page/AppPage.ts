const AppPage = {
  workspaceSelector: () => cy.findByText(/Task/),
  addWorkspaceButton: () => cy.findByText(/Add a workspace/),
  addWorkspaceForm: () => ({
    nameForm: () => cy.findByLabelText(/Name/i),
    tagForm: () => cy.findByLabelText(/Tag/i),
    submitButton: () => cy.findByText(/Submit/i),
  }),
  sidebar: () => {
    // eslint-disable-next-line cypress/no-assigning-return-values
    const sidebar = cy.findByTestId('app-sidebar');
    return {
      projects: () => sidebar.findByText(/Projects/),
      sprints: () => sidebar.findByText(/Sprints/),
    };
  },
  addSprintForm: () => ({
    nameForm: () => cy.findByLabelText(/Name/i),
    beginDateForm: () => cy.findByLabelText(/Begin Date/i),
    endDateForm: () => cy.findByText(/End Date/i),
  }),
};

export default AppPage;
