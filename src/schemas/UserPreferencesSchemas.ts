import { z } from 'zod';

export const UserPreferencesSchema = z.object({
  id: z.string(),
  userId: z.string(),
  workspaceId: z.string(),
  hasFinishedSetup: z.boolean(),
});

export const GetUserPreferencesResponseSchema = z.object({
  data: UserPreferencesSchema,
});
