import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import EditableTextDisplay from '../../../components/common/EditableDisplays/EditableTextDisplay';
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

  const { data: keyIssue } = useQuery([QueryKeys.PROJECT], () =>
    ProjectsService.getProject(tag)
  );

  if (!keyIssue) {
    return null;
  }

  return (
    <div>
      <EditableTextDisplay
        onBlurSubmission={getUpdaterFunction(tag, 'title')}
        initialValue={keyIssue.title}
        textDisplayClassName="text-xl font-bold"
      />
      <div className="mt-2">
        <EditableTextDisplay
          onBlurSubmission={getUpdaterFunction(tag, 'description')}
          initialValue={keyIssue.description}
        />
      </div>
    </div>
  );
};

ProjectPage.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default ProjectPage;
