import { Queue, Worker } from 'bullmq';

import { prisma } from '@src/lib/prisma';
import { convertEdgeSetDataToEdgeset } from '@src/schemas/ProjectMapEdgesSetSchemas';

const QUEUE_NAME = 'mapProcessingQueue';

const connectionDetails = {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number.parseInt(process.env.REDIS_PORT ?? ''),
    password: process.env.REDIS_PASSWORD,
  },
};

const mapProcessingQueue = new Queue<MapProcessingJobData>(
  QUEUE_NAME,
  connectionDetails
);

interface MapProcessingJobData {
  projectId: string;
}

interface MapProcessingJobResult {
  success: boolean;
}

new Worker<MapProcessingJobData, MapProcessingJobResult>(
  QUEUE_NAME,
  async (job) => {
    try {
      const { projectId } = job.data;

      const loggingForJob = (message: string) =>
        console.log(`[${QUEUE_NAME}]${job.id}][${projectId}] ${message}`);

      loggingForJob('Beginning');

      const edgeSet = await prisma.projectMapEdgesSet.findFirst({
        where: {
          projectId,
        },
      });

      if (!edgeSet) {
        return {
          success: false,
        };
      }

      const edgeSetData = convertEdgeSetDataToEdgeset(edgeSet.data);

      // Sync all edges to issue relation
      const resultPromises = edgeSetData.edges.map((edge) => {
        const sourceIssueId = edge.source;
        const targetIssueId = edge.target;

        return prisma.issueRelation.upsert({
          where: {
            sourceIssueId_targetIssueId: {
              sourceIssueId,
              targetIssueId,
            },
          },
          create: {
            sourceIssueId,
            targetIssueId,
            projectId,
          },
          update: {
            sourceIssueId,
            targetIssueId,
          },
        });
      });

      const upsertResult = await Promise.all(resultPromises);
      loggingForJob('Upsert result: ' + upsertResult.length);

      // Delete extraneous issue relations
      const issueRelationsForProject = await prisma.issueRelation.findMany({
        where: {
          projectId: projectId,
        },
      });

      if (issueRelationsForProject.length !== edgeSetData.edges.length) {
        const issueRelationMap = new Map();

        const keyify = (edge: { source: string; target: string }) =>
          `${edge.source},${edge.target}`;
        const keyifyIssueRelation = (edge: {
          sourceIssueId: string;
          targetIssueId: string;
        }) => `${edge.sourceIssueId},${edge.targetIssueId}`;

        edgeSetData.edges.forEach((edge) => {
          issueRelationMap.set(keyify(edge), true);
        });

        const issueRelationToDeletePromises: Promise<any>[] = [];

        issueRelationsForProject.forEach((issueRelation) => {
          if (!issueRelationMap.has(keyifyIssueRelation(issueRelation))) {
            loggingForJob(
              `Deleting issue relation: ${issueRelation.sourceIssueId}, ${issueRelation.targetIssueId}`
            );
            issueRelationToDeletePromises.push(
              prisma.issueRelation.delete({
                where: {
                  sourceIssueId_targetIssueId: {
                    sourceIssueId: issueRelation.sourceIssueId,
                    targetIssueId: issueRelation.targetIssueId,
                  },
                },
              })
            );
          }
        });

        await Promise.all(issueRelationToDeletePromises);
      }

      console.log(
        'Finished processing job: ' + job.id + ', projectId: ' + projectId
      );
      return Promise.resolve({
        success: true,
      });
    } catch (err) {
      console.log('Error executing job');
      console.log(err);
      return {
        success: false,
      };
    }
  },
  connectionDetails
);

function addProjectToProcessingQueue(projectId: string) {
  if (!projectId) {
    return;
  }

  mapProcessingQueue.add('mapProcessingJob', { projectId }, { attempts: 2 });
}

export { addProjectToProcessingQueue };
