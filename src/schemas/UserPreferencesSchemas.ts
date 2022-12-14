import { z } from 'zod';

export const UserPreferencesSchema = z.object({
  id: z.string(),
  userId: z.string(),
  workspaceId: z.nullable(z.string()),
  teamId: z.nullable(z.string()),
  hasFinishedSetup: z.boolean(),
});

export const GetUserPreferencesResponseSchema = z.object({
  data: UserPreferencesSchema,
});

export const UpdateUserPreferenceInputSchema = z.array(
  z.object({
    field: z.string(),
    value: z.string(),
  })
);

export const UpdateUserPreferenceResponseSchema = z.object({
  data: UserPreferencesSchema,
});
