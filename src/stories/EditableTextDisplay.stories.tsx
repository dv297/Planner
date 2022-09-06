import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import EditableTextDisplay, {
  EditableTextDisplayProps,
} from '../components/common/EditableTextDisplay';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'common/EditableTextDisplay',
  component: EditableTextDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EditableTextDisplay>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableTextDisplay> = (
  args: Partial<EditableTextDisplayProps>
) => (
  <EditableTextDisplay
    onBlurSubmission={() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }}
    initialValue="Sample title"
    {...args}
  />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
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
