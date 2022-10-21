import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Form from '@src/components/common/Form';
import FormSubmitButton from '@src/components/common/FormSubmitButton';
import SimpleMarkdownField from '@src/components/common/SimpleMarkdownField';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Forms/SimpleMarkdownField',
  component: SimpleMarkdownField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SimpleMarkdownField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SimpleMarkdownField> = () => {
  const [formSubmission, setFormSubmission] = useState('');

  return (
    <Form
      defaultValues={{ markdown: '' }}
      onSubmit={(data) => {
        setFormSubmission(data.markdown);
      }}
    >
      {({ keys }) => {
        return (
          <div>
            <div className="grid grid-rows-1 grid-cols-4 gap-x-4">
              <div className="col-span-3">
                <SimpleMarkdownField name={keys.markdown} id="markdown-input" />
              </div>
              <div className="col-span-1">
                <pre className="w-full">
                  {JSON.stringify(
                    {
                      formSubmission,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
            <div className="mt-2">
              <FormSubmitButton label="Submit" />
            </div>
          </div>
        );
      }}
    </Form>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
