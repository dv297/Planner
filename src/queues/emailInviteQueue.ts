import { Queue, Worker } from 'bullmq';

import mailClient, { getSanitizedSendEmailData } from '../lib/mailClient';
import TeamSettingsRepo from '../repos/TeamSettingsRepo';

const QUEUE_NAME = 'teamInviteQueue';

const connectionDetails = {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number.parseInt(process.env.REDIS_PORT ?? ''),
    password: process.env.REDIS_PASSWORD,
  },
};

const teamInviteQueue = new Queue<TeamInviteJobData>(
  QUEUE_NAME,
  connectionDetails
);

interface TeamInviteJobData {
  teamInviteId: string;
}

interface JobResult {
  success: boolean;
}

new Worker<TeamInviteJobData, JobResult>(
  QUEUE_NAME,
  async (job) => {
    try {
      const { teamInviteId } = job.data;

      const loggingForJob = (message: string) =>
        console.log(`[${QUEUE_NAME}]${job.id}][${teamInviteId}] ${message}`);

      loggingForJob('Beginning');

      const teamInvite = await TeamSettingsRepo.getTeamInviteById(teamInviteId);

      const msg = getSanitizedSendEmailData({
        to: teamInvite.email,
        from: process.env.EMAIL_FROM_ADDRESS,
        subject: 'Planner - Team Invite',
        text: 'You have been invited to collaborate using Planner.',
        html: `
<div>
    <p>Use the link below to accept the invitation and join this team</p>
    <a href='http://localhost:3000/team-invite/?id=${teamInvite.id}'>Join the team!</a>
</div>`,
      });

      await mailClient.send(msg);

      console.log(
        'Finished processing job: ' + job.id + ', projectId: ' + teamInviteId
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

function addToTeamInviteQueue(teamInviteId: string) {
  if (!teamInviteId) {
    return;
  }

  teamInviteQueue.add('teamInviteJob', { teamInviteId }, { attempts: 1 });
}

export { addToTeamInviteQueue };
