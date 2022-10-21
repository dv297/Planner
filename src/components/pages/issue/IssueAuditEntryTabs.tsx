import { ReactNode, SyntheticEvent, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import Form from '@src/components/common/Form';
import FormSubmitButton from '@src/components/common/FormSubmitButton';
import SimpleMarkdownField from '@src/components/common/SimpleMarkdownField';
import IssueAuditEntryListingFactory from '@src/components/pages/issue/IssueAuditEntryListingFactory';
import { IssueAuditEntryCreateBodySchema } from '@src/schemas/IssueSchema';
import IssueService from '@src/services/IssueService';
import QueryKeys from '@src/services/QueryKeys';

interface AuditEntryListProps {
  issueTag: string;
  filter?: 'comment' | 'change';
}

const AuditEntryList = (props: AuditEntryListProps) => {
  const { filter, issueTag } = props;

  const { data: issueAuditEntryResponse, isFetching } = useQuery(
    [QueryKeys.ISSUE_AUDIT_ENTRY, { tag: issueTag }],
    () => IssueService.getIssueAuditEntries(issueTag, { filter }),
    {
      cacheTime: 0,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isFetching) {
    return (
      <div className="w-full h-32 flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (!issueAuditEntryResponse) {
    return null;
  }

  if (issueAuditEntryResponse.length === 0) {
    let placeholderMessage = '';

    if (!filter) {
      placeholderMessage = 'No changes or comments made yet.';
    } else if (filter === 'comment') {
      placeholderMessage = 'No comments made yet';
    } else if (filter === 'change') {
      placeholderMessage = 'No changes made yet';
    }

    return (
      <div className="w-full h-32 flex">
        <p>{placeholderMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <ul role="list" className="-mb-8">
        {issueAuditEntryResponse.map((issueAuditEntry, index) => (
          <li key={issueAuditEntry.id}>
            <IssueAuditEntryListingFactory
              issueAuditEntry={issueAuditEntry}
              isLastItem={index === issueAuditEntryResponse.length - 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`issue-tabpanel-${index}`}
      aria-labelledby={`ìssue-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `issue-tab-${index}`,
    'aria-controls': `issue-tabpanel-${index}`,
  };
}

interface IssueAuditEntryTabsProps {
  issueTag: string;
}

const IssueAuditEntryTabs = (props: IssueAuditEntryTabsProps) => {
  const { issueTag } = props;
  const [value, setValue] = useState(0);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    [QueryKeys.ISSUE_AUDIT_ENTRY],
    (input: z.infer<typeof IssueAuditEntryCreateBodySchema>) =>
      IssueService.createIssueAuditEntry(issueTag, input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.ISSUE_AUDIT_ENTRY]);
      },
    }
  );

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="relative">
      <Form
        defaultValues={{ comment: '' }}
        onSubmit={async (data, helpers) => {
          if (data.comment !== '') {
            await mutation.mutate({
              type: 'COMMENT',
              oldValue: null,
              newValue: data.comment,
            });
            helpers.clearFormData();
          }
        }}
      >
        {({ keys }) => {
          return (
            <div>
              <SimpleMarkdownField name={keys.comment} />
              <FormSubmitButton
                label="Submit"
                isDisabled={mutation.isLoading}
              />
            </div>
          );
        }}
      </Form>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Issue History"
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Comments" {...a11yProps(1)} />
            <Tab label="History" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {value === 0 && (
          <TabPanel value={value} index={0}>
            <AuditEntryList issueTag={issueTag} />
          </TabPanel>
        )}
        {value === 1 && (
          <TabPanel value={value} index={1}>
            <AuditEntryList filter="comment" issueTag={issueTag} />
          </TabPanel>
        )}
        {value === 2 && (
          <TabPanel value={value} index={2}>
            <AuditEntryList filter="change" issueTag={issueTag} />
          </TabPanel>
        )}
      </Box>
    </div>
  );
};

export default IssueAuditEntryTabs;
