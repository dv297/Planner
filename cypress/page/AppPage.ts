const AppPage = {
  workspaceSelector: () => cy.findByText(/Task/),
  addWorkspaceButton: () => cy.findByText(/Add a workspace/),
  addWorkspaceForm: () => ({
    nameForm: () => cy.findByLabelText('Name'),
    tagForm: () => cy.findByLabelText('Tag'),
    submitButton: () => cy.findByText('Submit'),
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
    nameForm: () => cy.findByLabelText('Name'),
    beginDateForm: () => cy.findByLabelText('Begin Date'),
    endDateForm: () => cy.findByText('End Date'),
  }),
};

export default AppPage;
