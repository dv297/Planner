import { z } from 'zod';

import IssuesList from '@src/components/IssuesList';
import { IssueSchema } from '@src/schemas/IssueSchema';

interface IssueRelationListProps {
  relationshipLabel: string;
  issues: z.infer<typeof IssueSchema>[];
}

const IssueRelationList = (props: IssueRelationListProps) => {
  const { relationshipLabel, issues } = props;
  return (
    <div>
      <span className="font-bold text-lg">{relationshipLabel}</span>
      <div className="mt-4">
        <IssuesList issues={issues} />
      </div>
    </div>
  );
};

export default IssueRelationList;
