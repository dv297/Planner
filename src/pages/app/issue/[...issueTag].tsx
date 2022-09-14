import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import EditableMarkdownDisplay from '../../../components/common/EditableDisplays/EditableMarkdownDisplay';
import EditableTextDisplay from '../../../components/common/EditableDisplays/EditableTextDisplay';
import IssueRelationList from '../../../components/IssueRelationList';
import IssueStatusSelector from '../../../components/IssueStatusSelector';
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
      <div className="relative z-0 flex flex-1 overflow-hidden h-full">
        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
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
        <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-l border-gray-200 xl:flex xl:flex-col">
          <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <IssueStatusSelector
              onChange={getUpdaterFunction(tag, 'issueStatus')}
              initialValue={convertToIssueStatusType(issue.issueStatus)}
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
