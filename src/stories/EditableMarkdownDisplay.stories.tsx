import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import EditableMarkdownDisplay, {
  EditableMarkdownDisplayProps,
} from '../components/common/EditableDisplays/EditableMarkdownDisplay';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Forms/EditableMarkdownDisplay',
  component: EditableMarkdownDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EditableMarkdownDisplay>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableMarkdownDisplay> = (
  args: Partial<EditableMarkdownDisplayProps>
) => (
  <EditableMarkdownDisplay
    label="Description"
    onBlurSubmission={() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }}
    initialValue="# Sample title"
    {...args}
  />
);

export const Primary = Template.bind({});
Primary.args = {};
