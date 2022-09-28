interface GetPersonalInformationOutput {
  name: string;
  email: string;
  image: string;
}

interface UpdatePersonalInformationInput {
  name: string;
  email: string;
  image: string;
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
      image: data.image,
    };
  },
  updatePersonalInformation: async (data: UpdatePersonalInformationInput) => {
    await fetch('/api/settings/personal-information', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
};

export default SettingsService;
