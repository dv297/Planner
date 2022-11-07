import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import EditableTextDisplay, {
  EditableTextDisplayProps,
} from '../components/common/EditableDisplays/EditableTextDisplay';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Forms/EditableTextDisplay',
  component: EditableTextDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EditableTextDisplay>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableTextDisplay> = (
  args: Partial<EditableTextDisplayProps>
) => (
  <EditableTextDisplay
    id="title"
    onBlurSubmission={() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }}
    label="Title"
    initialValue={args.initialValue}
    {...args}
  />
);

export const Primary = Template.bind({});
Primary.args = {
  initialValue: 'Sample title',
};

export const Fails = Template.bind({});
Fails.args = {
  initialValue: 'Sample title',
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
  initialValue: 'Sample title',
  textDisplayClassName: 'font-bolder text-4xl text-blue-500',
};

export const Empty = Template.bind({});
Empty.args = {
  initialValue: undefined,
};
