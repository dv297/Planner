import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import EditableTextDisplay from '../components/common/EditableDisplays/EditableTextDisplay';
import IssueStatusPill from '../components/IssueStatusPill';
import IssueStatusType from '../types/IssueStatusType';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'common/IssueStatusPill',
  component: IssueStatusPill,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EditableTextDisplay>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableTextDisplay> = () => (
  <div className="grid grid-rows-2 grid-cols-3 gap-4">
    <IssueStatusPill issueStatus={IssueStatusType.PLANNING} />
    <IssueStatusPill issueStatus={IssueStatusType.NOT_STARTED} />
    <IssueStatusPill issueStatus={IssueStatusType.IN_PROGRESS} />
    <IssueStatusPill issueStatus={IssueStatusType.READY_FOR_REVIEW} />
    <IssueStatusPill issueStatus={IssueStatusType.CLOSED} />
    <IssueStatusPill issueStatus={IssueStatusType.COMPLETE} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
