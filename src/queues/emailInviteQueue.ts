import { Queue, Worker } from 'bullmq';

import mailClient, { getSanitizedSendEmailData } from '@src/lib/mailClient';
import TeamSettingsRepo from '@src/repos/TeamSettingsRepo';
import TeamsRepo from '@src/repos/TeamsRepo';

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
      const team = await TeamsRepo.getTeamById(teamInvite.teamId);

      if (!team) {
        return Promise.resolve({
          success: false,
        });
      }

      const msg = getSanitizedSendEmailData({
        to: teamInvite.email,
        from: process.env.EMAIL_FROM_ADDRESS,
        subject: 'Planner - Team Invite',
        html: `
<div>
    <p>You have been invited to collaborate using Planner for the team "${team.name}".</p>
    <p>Use the link below to accept the invitation and join this team</p>
    <a href='${process.env.BASE_URL}/team-invite/?inviteToken=${teamInvite.inviteToken}'>Join the team!</a>
</div>`,
      });

      try {
        await mailClient.send(msg);
      } catch (err) {
        console.error('Error sending email');
        console.error(err);
        return Promise.resolve({
          success: false,
        });
      }

      console.log(
        'Finished processing job: ' + job.id + ', projectId: ' + teamInviteId
      );
      return Promise.resolve({
        success: true,
      });
    } catch (err) {
      console.error('Error executing job');
      console.error(err);
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
