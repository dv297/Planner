import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import EditableTextDisplay from '../components/common/EditableDisplays/EditableTextDisplay';
import FormBuilder from '../components/common/FormBuilder';

export default {
  title: 'Forms/FormBuilder',
  component: FormBuilder,
  argTypes: {},
} as ComponentMeta<typeof FormBuilder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableTextDisplay> = () => (
  <div>
    <FormBuilder
      initialData={{
        title: '',
        assignee: '',
        beginDate: null,
        description: '',
      }}
      inputs={[
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          isRequired: true,
        },
        {
          name: 'assignee',
          label: 'Assignee',
          type: 'text',
        },
        {
          name: 'beginDate',
          label: 'Begin Date',
          type: 'date',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'markdown',
        },
      ]}
      onSubmit={(data) => {
        console.log(data);
        return Promise.resolve();
      }}
    />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
