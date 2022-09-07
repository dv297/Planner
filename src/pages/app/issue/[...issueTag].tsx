import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import EditableMarkdownDisplay from '../../../components/common/EditableDisplays/EditableMarkdownDisplay';
import EditableTextDisplay from '../../../components/common/EditableDisplays/EditableTextDisplay';
import IssueService from '../../../services/IssueService';
import QueryKeys from '../../../services/QueryKeys';

const getUpdaterFunction =
  (tag: string | undefined, propertyName: string) =>
  async (textValue: string) => {
    await IssueService.updateIssue(tag, propertyName, textValue);
  };

const ProjectPage = () => {
  const router = useRouter();

  const { issueTag } = router.query;

  const tag = Array.isArray(issueTag) ? issueTag[0] : issueTag;

  const { data: issue } = useQuery([QueryKeys.ISSUE], () =>
    IssueService.getIssue(tag)
  );

  if (!issue) {
    return null;
  }

  return (
    <div>
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
      <div className="mt-8" />
    </div>
  );
};

ProjectPage.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default ProjectPage;
