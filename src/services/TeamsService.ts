import { CreateTeamInput } from '@src/repos/TeamsRepo';
import {
  CreateTeamResponseSchema,
  GetTeamsResponseSchema,
} from '@src/schemas/TeamsSchema';

const TeamsService = {
  getTeamsForUser: async () => {
    const result = await fetch(`/api/teams`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!result.ok) {
      throw new Error('Response failed');
    }

    const data = await result.json();

    const response = GetTeamsResponseSchema.parse(data);

    return response.data;
  },
  async createTeamForUser(input: CreateTeamInput) {
    const result = await fetch(`/api/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!result.ok) {
      throw new Error('Response failed');
    }

    const data = await result.json();

    const response = CreateTeamResponseSchema.parse(data);

    return response.data;
  },
};

export default TeamsService;
