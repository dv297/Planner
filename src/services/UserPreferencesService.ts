import { z } from 'zod';

import {
  GetUserPreferencesResponseSchema,
  UpdateUserPreferenceInputSchema,
} from '../schemas/UserPreferencesSchemas';

const UserPreferencesService = {
  get: async () => {
    const result = await fetch('/api/user-preferences', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await result.json();

    const response = GetUserPreferencesResponseSchema.parse(data);

    return response.data;
  },
  update: async (input: z.infer<typeof UpdateUserPreferenceInputSchema>) => {
    const sanitizedInput = UpdateUserPreferenceInputSchema.parse(input);

    const result = await fetch('/api/user-preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedInput),
    });

    const data = await result.json();

    return data;
  },
};

export default UserPreferencesService;
