import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextInput from '@src/components/common/Forms/TextInput';

export default {
  title: 'Common/Forms/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = () => {
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const [value3, setValue3] = useState<string | null>('Initial value');
  const [value4, setValue4] = useState<string | null>(null);
  const [value5, setValue5] = useState<string | null>(null);
  const [value6, setValue6] = useState<string | null>(null);

  return (
    <div className="grid grid-rows-1 grid-cols-2 gap-x-4">
      <div className="flex flex-col flex-1">
        <TextInput
          id="label-1"
          value={value1}
          onChange={(event) => setValue1(event.target.value)}
          label="Label 1"
        />
        <TextInput
          id="label-2"
          value={value2}
          onChange={(event) => setValue2(event.target.value)}
          label="Label 2"
          required
        />
        <TextInput
          id="label-3"
          value={value3}
          onChange={(event) => setValue3(event.target.value)}
          label="Label 3"
        />
        <TextInput
          id="label-4"
          value={value4}
          onChange={(event) => setValue4(event.target.value)}
          label="Label 4"
          required
          error
        />
        <TextInput
          id="label-5"
          value={value5}
          onChange={(event) => setValue5(event.target.value)}
          label="Label 5"
          error
          helperText="Must be 3 or more characters"
        />
        <TextInput
          id="label-6"
          value={value6}
          onChange={(event) => setValue6(event.target.value)}
          label="Label 6"
        />
      </div>
      <div className="flex-1">
        <pre className="w-full">
          {JSON.stringify(
            {
              value1,
              value2,
              value3,
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
