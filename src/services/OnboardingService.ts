const OnboardingService = {
  createDefaultWorkspaceAndTeam: async () => {
    await fetch('/api/initial-setup/create-default-team-and-workspace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  },
  acceptTeamInvite: async (inviteToken: string | undefined) => {
    if (!inviteToken) {
      return;
    }

    await fetch('/api/initial-setup/create-default-team-and-workspace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inviteToken }),
    });
  },
};

export default OnboardingService;
