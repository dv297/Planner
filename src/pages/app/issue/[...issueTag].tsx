import { ReactNode } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import EditableMarkdownDisplay from '@src/components/common/EditableDisplays/EditableMarkdownDisplay';
import EditableTextDisplay from '@src/components/common/EditableDisplays/EditableTextDisplay';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import IssueRelationList from '@src/components/IssueRelationList';
import IssueEditableFields from '@src/components/pages/issue/IssueEditableFields';
import IssueRelationService from '@src/services/IssueRelationService';
import IssueService from '@src/services/IssueService';
import QueryKeys from '@src/services/QueryKeys';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

const ProjectPage = () => {
  const router = useRouter();

  const { issueTag } = router.query;

  const tag = Array.isArray(issueTag) ? issueTag[0] : issueTag;

  const { data: issue } = useQuery(
    [QueryKeys.ISSUE, { tag }],
    () => IssueService.getIssue(tag),
    {
      cacheTime: 0,
      keepPreviousData: false,
    }
  );

  const { data: issueRelation } = useQuery(
    [QueryKeys.ISSUE_RELATION, { tag }],
    () => IssueRelationService.getIssueRelation(tag),
    {
      cacheTime: 0,
      keepPreviousData: false,
    }
  );

  const snackbar = useSnackbar();

  const queryClient = useQueryClient();

  if (!issue || !tag) {
    return null;
  }

  const keyIssueTag = parseIssueTagFromIssue(issue.project.keyIssue);

  const getUpdaterFunction =
    (tag: string | undefined, propertyName: string) =>
    async (textValue: string) => {
      try {
        await IssueService.updateIssue(tag, propertyName, textValue);
        queryClient.invalidateQueries();
      } catch (err) {
        snackbar.displaySnackbar({
          message:
            'There was an error saving your change. Make a change and try again',
          severity: SnackbarSeverity.ERROR,
        });
      }
    };

  return (
    <>
      <Head>
        <title>Planner - {parseIssueTagFromIssue(issue)}</title>
      </Head>
      <div className="h-full" key={issue.id}>
        <div className="mb-6">
          <Breadcrumbs aria-label="breadcrumb">
            <Link href={`/app/project/${keyIssueTag}`}>{keyIssueTag}</Link>
            <span>{issueTag}</span>
          </Breadcrumbs>
        </div>

        <div className="relative z-0 flex flex-col flex-1 h-full lg:flex-row lg:min-h-screen">
          <main className="relative lg:flex-1 z-0 focus:outline-none lg:mr-6 lg:h-128">
            <EditableTextDisplay
              onBlurSubmission={getUpdaterFunction(tag, 'title')}
              initialValue={issue.title}
              textDisplayClassName="text-xl font-bold"
              id="title"
              label="Title"
            />
            <div className="mt-2">
              <EditableMarkdownDisplay
                label="Description"
                onBlurSubmission={getUpdaterFunction(tag, 'description')}
                initialValue={issue.description}
              />
            </div>
            <div className="mt-8">
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
          <aside
            className={clsx(
              'relative w-full mt-8 flex-shrink-0 overflow-y-auto md:flex md:flex-col pb-96',
              'lg:mt-0 lg:w-72 lg:pl-8 lg:pb-0 lg:border-gray-200 dark:lg:border-gray-700 lg:border-l lg:h-128'
            )}
          >
            <IssueEditableFields tag={tag} issue={issue} />
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
