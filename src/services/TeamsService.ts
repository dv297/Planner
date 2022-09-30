import { GetTeamsResponseSchema } from '@src/schemas/TeamsSchema';

const TeamsService = {
  getTeamsForUser: async () => {
    const result = await fetch(`/api/teams`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    const response = GetTeamsResponseSchema.parse(data);

    return response.data;
  },
};

export default TeamsService;
