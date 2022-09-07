import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import EditableMarkdownDisplay from '../../../components/common/EditableDisplays/EditableMarkdownDisplay';
import EditableTextDisplay from '../../../components/common/EditableDisplays/EditableTextDisplay';
import IssuesList from '../../../components/common/IssuesList';
import ProjectsService from '../../../services/ProjectsService';
import QueryKeys from '../../../services/QueryKeys';

const getUpdaterFunction =
  (tag: string | undefined, propertyName: string) =>
  async (textValue: string) => {
    await ProjectsService.updateProject(tag, propertyName, textValue);
  };

const ProjectPage = () => {
  const router = useRouter();

  const { issueTag } = router.query;

  const tag = Array.isArray(issueTag) ? issueTag[0] : issueTag;

  const { data: project } = useQuery([QueryKeys.PROJECT], () =>
    ProjectsService.getProject(tag)
  );

  if (!project) {
    return null;
  }

  return (
    <div>
      <EditableTextDisplay
        onBlurSubmission={getUpdaterFunction(tag, 'title')}
        initialValue={project.keyIssue.title}
        textDisplayClassName="text-xl font-bold"
      />
      <div className="mt-2">
        <EditableMarkdownDisplay
          onBlurSubmission={getUpdaterFunction(tag, 'description')}
          initialValue={project.keyIssue.description}
        />
      </div>
      <div className="mt-8">
        <IssuesList
          issues={project.issues}
          projectId={project.keyIssue.projectId}
        />
      </div>
    </div>
  );
};

ProjectPage.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default ProjectPage;
