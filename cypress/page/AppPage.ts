const AppPage = {
  workspaceSelector: () => cy.findByText(/Task/),
  addWorkspaceButton: () => cy.findByText(/Add a workspace/),
  addWorkspaceForm: () => ({
    nameForm: () => cy.findByLabelText('Name'),
    tagForm: () => cy.findByLabelText('Tag'),
    submitButton: () => cy.findByText('Submit'),
  }),
};

export default AppPage;
