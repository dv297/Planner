import { z } from 'zod';

export const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  tag: z.string(),
});

export const GetWorkspacesResponseDataSchema = z.array(WorkspaceSchema);

export const GetWorkspacesResponseSchema = z.object({
  data: GetWorkspacesResponseDataSchema,
});

export const CreateWorkspaceSchema = z.object({
  tag: z.string().min(3).max(7),
  name: z.string().min(3).max(30),
});
