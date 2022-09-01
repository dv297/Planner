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

export const UpdateUserPreferenceInputSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
});

export const UpdateUserPreferenceResponseSchema = z.object({
  data: UserPreferencesSchema,
});
