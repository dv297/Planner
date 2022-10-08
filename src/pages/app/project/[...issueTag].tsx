import { ReactNode } from 'react';
import MapIcon from '@mui/icons-material/Map';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import EditableMarkdownDisplay from '@src/components/common/EditableDisplays/EditableMarkdownDisplay';
import EditableTextDisplay from '@src/components/common/EditableDisplays/EditableTextDisplay';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import IssuesList from '@src/components/IssuesList';
import ProjectsService from '@src/services/ProjectsService';
import QueryKeys from '@src/services/QueryKeys';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

const ProjectPage = () => {
  const router = useRouter();

  const { issueTag } = router.query;

  const tag = Array.isArray(issueTag) ? issueTag[0] : issueTag;

  const { data: project } = useQuery(
    [QueryKeys.PROJECT, { tag }],
    () => ProjectsService.getProject(tag),
    {
      cacheTime: 0,
      keepPreviousData: true,
    }
  );

  const queryClient = useQueryClient();

  if (!project || !project.keyIssue) {
    return null;
  }

  const getUpdaterFunction =
    (tag: string | undefined, propertyName: string) =>
    async (textValue: string) => {
      await ProjectsService.updateProject(tag, propertyName, textValue);
      queryClient.invalidateQueries([QueryKeys.PROJECT, { tag }]);
    };

  return (
    <div>
      <Head>
        <title>Planner - {parseIssueTagFromIssue(project.keyIssue)}</title>
      </Head>
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex flex-grow flex-1 w-full mr-16">
          <EditableTextDisplay
            onBlurSubmission={getUpdaterFunction(tag, 'title')}
            initialValue={project.keyIssue.title}
            textDisplayClassName="text-xl font-bold"
          />
        </div>
        <div className="ml-3 mt-4 sm:ml-0 sm:mt-0">
          <Link href={`/app/map/${tag}`}>
            <span className="rounded-full bg-green-700 px-4 py-3 text-white font-bold cursor-pointer">
              <span className="mr-2">
                <MapIcon />
              </span>
              Navigate to Project Map
            </span>
          </Link>
        </div>
      </div>
      <div className="mt-2">
        <EditableMarkdownDisplay
          label="Description"
          onBlurSubmission={getUpdaterFunction(tag, 'description')}
          initialValue={project.keyIssue.description}
        />
      </div>

      <div className="mt-8">
        <IssuesList
          issues={project.issues}
          projectId={project.keyIssue.projectId}
          allowIssueCreation
        />
      </div>
    </div>
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
