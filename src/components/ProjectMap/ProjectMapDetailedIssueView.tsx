import IssueEditableFields from '@src/components/pages/issue/IssueEditableFields';
import { useProjectMapContext } from '@src/components/ProjectMap/ProjectMapContext';
import { useProjectMapSelectedIssueContext } from '@src/components/ProjectMap/ProjectMapSelectedIssueContext';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

const ProjectMapDetailedIssueView = () => {
  const projectMapContext = useProjectMapContext();
  const selectedIssueContext = useProjectMapSelectedIssueContext();

  const { selectedIssueId } = selectedIssueContext;

  if (!selectedIssueId) {
    return null;
  }

  const selectedIssue = projectMapContext.project?.issues.find(
    (issue) => issue.id === selectedIssueId
  );

  if (!selectedIssue) {
    return null;
  }

  const tag = parseIssueTagFromIssue(selectedIssue);

  return (
    <>
      <h1 className="text-lg font-bold mb-6">{selectedIssue.title}</h1>
      <div>
        <IssueEditableFields
          key={selectedIssue.id}
          issue={selectedIssue}
          tag={tag}
        />
      </div>
    </>
  );
};

export default ProjectMapDetailedIssueView;
