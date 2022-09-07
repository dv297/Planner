import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import EditableTextDisplay from '../components/common/EditableDisplays/EditableTextDisplay';
import IssueStatusSelector from '../components/IssueStatusSelector';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'common/IssueStatusSelector',
  component: IssueStatusSelector,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EditableTextDisplay>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableTextDisplay> = () => (
  <IssueStatusSelector />
);

export const Primary = Template.bind({});
Primary.args = {};
