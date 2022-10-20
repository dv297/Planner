import { ReactNode, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useQuery } from '@tanstack/react-query';

import IssueAuditEntryListingFactory from '@src/components/pages/issue/IssueAuditEntryListingFactory';
import IssueService from '@src/services/IssueService';
import QueryKeys from '@src/services/QueryKeys';

interface AuditEntryListProps {
  issueTag: string;
  filter?: 'comment' | 'change';
}

const AuditEntryList = (props: AuditEntryListProps) => {
  const { filter, issueTag } = props;

  const { data: issueAuditEntryResponse, isLoading } = useQuery(
    [QueryKeys.ISSUE_AUDIT_ENTRY, { tag: issueTag }],
    () => IssueService.getIssueAuditEntries(issueTag, { filter }),
    {
      cacheTime: 0,
      keepPreviousData: false,
    }
  );

  if (isLoading) {
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
    return (
      <div className="w-full h-32 flex">
        <p>No changes or comments made yet.</p>
      </div>
    );
  }

  // return <div>AuditEntryList</div>;
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface IssueAuditEntryTabsProps {
  issueTag: string;
}

const IssueAuditEntryTabs = (props: IssueAuditEntryTabsProps) => {
  const { issueTag } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
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
  );
};

export default IssueAuditEntryTabs;
