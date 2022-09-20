import { JsonValue } from 'type-fest';
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

export const GetSingleProjectMapEdgesSetResponseDataSchema = z.object({
  edges: ProjectMapEdgesSetSchema,
});

export const GetSingleProjectMapEdgesSetResponseSchema = z.object({
  data: GetSingleProjectMapEdgesSetResponseDataSchema,
});

export const convertEdgeSetDataToEdgeset = (
  data: string | JsonValue | undefined | null
): z.infer<typeof ProjectMapEdgesSetDataParsedJsonSchema> => {
  if (!data) {
    throw new Error('Cannot parse edgeset from undefined');
  }

  const edgeset = JSON.parse(data as string);
  return ProjectMapEdgesSetDataParsedJsonSchema.parse(edgeset);
};
