import { z } from 'zod';

export const GetProjectsInputSchema = z.object({
  workspaceTag: z.array(z.string()),
});

export const GetProjectsResponseDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  workspaceId: z.string(),
});

export const GetProjectsResponseSchema = z.object({
  data: z.array(GetProjectsResponseDataSchema),
});
