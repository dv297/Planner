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
    };
  },
};

export default AppPage;
