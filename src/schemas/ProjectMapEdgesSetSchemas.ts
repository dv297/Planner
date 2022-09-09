import { z } from 'zod';

export const GetSingleProjectMapEdgeInputSchema = z.object({
  issueTag: z.array(z.string()),
});

export const ProjectMapEdgesSetDataSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
});

export const ProjectMapEdgesSetListSchema = z.array(
  ProjectMapEdgesSetDataSchema
);

export const ProjectMapEdgesSetDataParsedJsonSchema = z.object({
  edges: ProjectMapEdgesSetListSchema,
});

export const UpdateSingleProjectMapEdgesSetInputSchema = z.object({
  id: z.string(),
  data: z.object({
    edges: ProjectMapEdgesSetListSchema,
  }),
});

export const ProjectMapEdgesSetSchema = z.object({
  id: z.string(),
  data: ProjectMapEdgesSetDataParsedJsonSchema,
  projectId: z.string(),
});

export const GetSingleProjectMapEdgesSetResponseSchema = z.object({
  data: z.object({
    edges: ProjectMapEdgesSetSchema,
  }),
});
