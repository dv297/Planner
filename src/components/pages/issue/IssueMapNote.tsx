import EditableTextDisplay from '@src/components/common/EditableDisplays/EditableTextDisplay';
import useIssueUpdaterFunction from '@src/hooks/useIssueUpdaterFunction';

interface IssueMapNoteProps {
  issueTag: string;
  initialValue: string | null | undefined;
}

const IssueMapNote = (props: IssueMapNoteProps) => {
  const { initialValue, issueTag } = props;

  return (
    <EditableTextDisplay
      onBlurSubmission={useIssueUpdaterFunction({
        tag: issueTag,
        propertyName: 'mapNote',
      })}
      initialValue={initialValue ?? ''}
      textDisplayClassName=""
      id="issue-map-note"
      label="Issue Map Note"
    />
  );
};

export default IssueMapNote;
