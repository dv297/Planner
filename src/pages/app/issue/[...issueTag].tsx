import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import EditableMarkdownDisplay from '../../../components/common/EditableDisplays/EditableMarkdownDisplay';
import EditableTextDisplay from '../../../components/common/EditableDisplays/EditableTextDisplay';
import IssueRelationList from '../../../components/IssueRelationList';
import IssueAssigneeSelector from '../../../components/pages/issue/IssueAssigneeSelector';
import IssueStatusSelector from '../../../components/pages/issue/IssueStatusSelector';
import IssueRelationService from '../../../services/IssueRelationService';
import IssueService from '../../../services/IssueService';
import QueryKeys from '../../../services/QueryKeys';
import { convertToIssueStatusType } from '../../../types/IssueStatusType';

const getUpdaterFunction =
  (tag: string | undefined, propertyName: string) =>
  async (textValue: string) => {
    await IssueService.updateIssue(tag, propertyName, textValue);
  };

const ProjectPage = () => {
  const router = useRouter();

  const { issueTag } = router.query;

  const tag = Array.isArray(issueTag) ? issueTag[0] : issueTag;

  const { data: issue } = useQuery([`${QueryKeys.ISSUE}-${tag}`], () =>
    IssueService.getIssue(tag)
  );

  const { data: issueRelation } = useQuery(
    [`${QueryKeys.ISSUE_RELATION}-${tag}`],
    () => IssueRelationService.getIssueRelation(tag)
  );

  if (!issue) {
    return null;
  }

  return (
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
        <aside className="relative w-96 flex-shrink-0 overflow-y-auto lg:border-l border-gray-200 md:flex md:flex-col lg:px-12">
          <div>
            <IssueStatusSelector
              onChange={getUpdaterFunction(tag, 'issueStatus')}
              initialValue={convertToIssueStatusType(issue.issueStatus)}
            />
          </div>
          <div className="mt-8 w-full">
            <IssueAssigneeSelector
              issueTag={tag}
              initialAssignee={issue.assignee}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

ProjectPage.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default ProjectPage;
