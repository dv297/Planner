import { ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import EditableMarkdownDisplay from '@src/components/common/EditableDisplays/EditableMarkdownDisplay';
import EditableTextDisplay from '@src/components/common/EditableDisplays/EditableTextDisplay';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import IssueRelationList from '@src/components/IssueRelationList';
import IssueAssigneeSelector from '@src/components/pages/issue/IssueAssigneeSelector';
import IssueStatusSelector from '@src/components/pages/issue/IssueStatusSelector';
import SprintSelector from '@src/components/pages/issue/SprintSelector';
import IssueRelationService from '@src/services/IssueRelationService';
import IssueService from '@src/services/IssueService';
import QueryKeys from '@src/services/QueryKeys';
import { convertToIssueStatusType } from '@src/types/IssueStatusType';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

const ProjectPage = () => {
  const router = useRouter();

  const { issueTag } = router.query;

  const tag = Array.isArray(issueTag) ? issueTag[0] : issueTag;

  const { data: issue } = useQuery([QueryKeys.ISSUE, { tag }], () =>
    IssueService.getIssue(tag)
  );

  const { data: issueRelation } = useQuery(
    [QueryKeys.ISSUE_RELATION, { tag }],
    () => IssueRelationService.getIssueRelation(tag)
  );

  const queryClient = useQueryClient();

  if (!issue) {
    return null;
  }

  const getUpdaterFunction =
    (tag: string | undefined, propertyName: string) =>
    async (textValue: string) => {
      await IssueService.updateIssue(tag, propertyName, textValue);
      queryClient.invalidateQueries();
    };

  return (
    <>
      <Head>
        <title>Planner - {parseIssueTagFromIssue(issue)}</title>
      </Head>
      <div className="h-full" key={issue.id}>
        <div className="relative z-0 flex flex-col flex-1 h-full lg:flex-row">
          <main className="relative lg:flex-1 z-0 overflow-y-auto focus:outline-none">
            <EditableTextDisplay
              onBlurSubmission={getUpdaterFunction(tag, 'title')}
              initialValue={issue.title}
              textDisplayClassName="text-xl font-bold"
            />
            <div className="mt-2">
              <EditableMarkdownDisplay
                label="Description"
                onBlurSubmission={getUpdaterFunction(tag, 'description')}
                initialValue={issue.description}
              />
            </div>
            <div className="mt-8 px-6">
              {issueRelation?.BLOCKED_BY?.length ? (
                <div className="mt-4">
                  <IssueRelationList
                    relationshipLabel="Blocked By"
                    issues={issueRelation?.BLOCKED_BY}
                  />
                </div>
              ) : null}

              {issueRelation?.BLOCKS?.length ? (
                <div className="mt-4">
                  <IssueRelationList
                    relationshipLabel="Blocks"
                    issues={issueRelation?.BLOCKS}
                  />
                </div>
              ) : null}
            </div>
          </main>
          <aside className="relative w-full mt-8 lg:mt-0 lg:w-72 flex-shrink-0 overflow-y-auto lg:border-l border-gray-200 md:flex md:flex-col lg:px-4">
            <div>
              <IssueStatusSelector
                onChange={getUpdaterFunction(tag, 'issueStatus')}
                initialValue={convertToIssueStatusType(issue.issueStatus)}
              />
            </div>
            <div className="mt-8">
              <IssueAssigneeSelector
                issueTag={tag}
                initialAssignee={issue.assignee}
              />
            </div>
            <div className="mt-8">
              <SprintSelector issueTag={tag} initialValue={issue.sprint} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

ProjectPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppDefaultLayout>
      <ConstrainDashboardContainer>{page}</ConstrainDashboardContainer>
    </AppDefaultLayout>
  );
};

export default ProjectPage;
