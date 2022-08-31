import { z } from 'zod';

export const CreateWorkspaceSchema = z.object({
  tag: z.string().min(3).max(7),
  name: z.string().min(3).max(30),
});
