import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextInput from '@src/components/common/Forms/TextInput';

export default {
  title: 'Common/Forms/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (props) => {
  const [value, setValue] = useState<string | null>(props.value ?? null);

  return (
    <div className="grid grid-rows-1 grid-cols-4 gap-x-4">
      <div className="col-span-3">
        <TextInput
          {...props}
          id="text-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Name"
        />
      </div>
      <div className="col-span-1">
        <pre className="w-full">
          {JSON.stringify(
            {
              value,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const ValueFilled = Template.bind({});
ValueFilled.args = {
  value: 'Daniel Vu',
};

export const WithError = Template.bind({});
WithError.args = {
  error: true,
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  error: true,
  helperText: 'Value must match the pattern',
};

export const WithEndAdornment = Template.bind({});
WithEndAdornment.args = {
  endAdornment: (
    <button
      onClick={() => {
        console.log('Clicked');
      }}
    >
      Cancel
    </button>
  ),
};
