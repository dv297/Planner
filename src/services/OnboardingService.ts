const OnboardingService = {
  createDefaultWorkspaceAndTeam: async () => {
    await fetch('/api/initial-setup/create-default-team-and-workspace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

export default OnboardingService;
