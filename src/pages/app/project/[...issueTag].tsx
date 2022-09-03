import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import ProjectsService from '../../../services/ProjectsService';
import QueryKeys from '../../../services/QueryKeys';

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
      <h1 className="text-lg font-bold text-slate-800">{keyIssue.title}</h1>
      <div className="mt-4">
        <span>{keyIssue.description}</span>
      </div>
    </div>
  );
};

ProjectPage.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default ProjectPage;
