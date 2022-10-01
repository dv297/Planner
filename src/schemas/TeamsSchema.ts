import { z } from 'zod';

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const TeamsListSchema = z.array(TeamSchema);

export const GetTeamsResponseSchema = z.object({
  data: TeamsListSchema,
});

export const CreateTeamInputSchema = z.object({
  name: z.string(),
});

export const CreateTeamResponseSchema = z.object({
  data: TeamSchema,
});
