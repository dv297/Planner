import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import EditableTextDisplay, {
  EditableTextDisplayProps,
} from '../components/common/EditableDisplays/EditableTextDisplay';
import IssueStatusPill from '../components/IssueStatusPill';

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
    <IssueStatusPill issueStatus="PLANNING" />
    <IssueStatusPill issueStatus="IN_PROGRESS" />
    <IssueStatusPill issueStatus="IN_REVIEW" />
    <IssueStatusPill issueStatus="TESTING" />
    <IssueStatusPill issueStatus="COMPLETE" />
    <IssueStatusPill issueStatus="CLOSED" />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};

export const Fails = Template.bind({});
Fails.args = {
  onBlurSubmission() {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject();
      }, 1000);
    });
  },
};

export const StyledTextDisplay = Template.bind({});
StyledTextDisplay.args = {
  textDisplayClassName: 'font-bolder text-4xl text-blue-500',
};
