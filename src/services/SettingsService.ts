interface GetPersonalInformationOutput {
  name: string;
  email: string;
}

interface CreateWorkspaceInput {
  name: string;
  email: string;
}

const SettingsService = {
  getPersonalInformation: async (): Promise<GetPersonalInformationOutput> => {
    const result = await fetch('/api/settings/personal-information', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    return {
      name: data.name,
      email: data.email,
    };
  },
  updatePersonalInformation: async (data: CreateWorkspaceInput) => {
    const body = { name: data.name, email: data.email };
    await fetch('/api/settings/personal-information', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  },
};

export default SettingsService;
