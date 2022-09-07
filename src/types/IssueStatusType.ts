enum IssueStatusType {
  PLANNING = 'PLANNING',
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  READY_FOR_REVIEW = 'READY_FOR_REVIEW',
  COMPLETE = 'COMPLETE',
  CLOSED = 'CLOSED',
}

const convertToIssueStatusType = (input: string) => {
  const validEntry = IssueStatusType[input as keyof typeof IssueStatusType];

  if (!validEntry) {
    throw new Error('Invalid Status Mapping: ' + input);
  }

  return validEntry;
};

export default IssueStatusType;
export { convertToIssueStatusType };
