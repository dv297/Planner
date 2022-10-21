import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import IssueAuditEntryRepo from '@src/repos/IssueAuditEntryRepo';
import IssueRepo from '@src/repos/IssueRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  GetIssueAuditEntriesResponseSchema,
  GetSingleIssueInputSchema,
  IssueAuditEntryCreateBodySchema,
  IssueAuditEntryType,
} from '@src/schemas/IssueSchema';
import extractSingle from '@src/utils/extractSingle';
import routeMatcher from '@src/utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamId = extractSingle(req.headers['team-id']);

  if (!teamId) {
    return res.status(500).json({
      message: 'Header `team-id` not provided',
    });
  }
  const { issueTag } = GetSingleIssueInputSchema.parse(req.query);
  const tag = issueTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const issueResponse = await IssueRepo.getIssueByTag(currentUser, tag, teamId);

  if (!issueResponse || !issueResponse.issue) {
    return res.status(404).send('Not Found');
  }

  const issueAuditEntries =
    await IssueAuditEntryRepo.getIssueAuditEntriesByIssueId(
      issueResponse.issue.id,
      { filter: IssueAuditEntryType.parse(req.query.filter) }
    );

  const response = GetIssueAuditEntriesResponseSchema.parse({
    data: issueAuditEntries,
  });

  return res.json(response);
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamId = extractSingle(req.headers['team-id']);

  if (!teamId) {
    return res.status(500).json({
      message: 'Header `team-id` not provided',
    });
  }

  const { issueTag } = GetSingleIssueInputSchema.parse(req.query);
  const createOptions = IssueAuditEntryCreateBodySchema.parse(req.body);
  const tag = extractSingle(issueTag);

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser || !tag) {
    return;
  }

  const issueResponse = await IssueRepo.getIssueByTag(currentUser, tag, teamId);

  if (!issueResponse?.issue) {
    return res.status(404).json({ message: 'Issue not found' });
  }

  const issueAuditEntries = await IssueAuditEntryRepo.createIssueAuditEntry(
    currentUser,
    issueResponse.issue.id,
    createOptions
  );
  const response = { data: issueAuditEntries };

  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
    POST: create,
  });
}

export default withAuthMiddleware(handle);
