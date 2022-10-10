import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import EditableTextDisplay from '../components/common/EditableDisplays/EditableTextDisplay';
import IssueStatusSelector from '../components/pages/issue/IssueStatusSelector';
import IssueStatusType from '../types/IssueStatusType';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Issues/IssueStatusSelector',
  component: IssueStatusSelector,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EditableTextDisplay>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableTextDisplay> = () => (
  <IssueStatusSelector
    initialValue={IssueStatusType.IN_PROGRESS}
    onChange={async (value) => {
      console.log(value);
    }}
  />
);

export const Primary = Template.bind({});
Primary.args = {};
