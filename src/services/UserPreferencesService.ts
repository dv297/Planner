import { GetUserPreferencesResponseSchema } from '../schemas/UserPreferencesSchemas';

const UserPreferencesService = {
  get: async () => {
    const result = await fetch('/api/user-preferences', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    const response = GetUserPreferencesResponseSchema.parse(data);

    return response.data;
  },
};

export default UserPreferencesService;
