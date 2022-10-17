import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Dropdown from '@src/components/common/Forms/Dropdown';

export default {
  title: 'Common/Forms/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = () => {
  const [value, setValue] = useState<string | null>(null);

  const options = [
    { label: 'Unassigned', id: 'Unassigned' },
    { label: 'In Planning', id: 'In Planning' },
    { label: 'Not Started', id: 'Not Started' },
    { label: 'In Progress', id: 'In Progress' },
    { label: 'Ready for Review', id: 'Ready for Review' },
    { label: 'Complete', id: 'Complete' },
  ];

  return (
    <div className="grid grid-rows-1 grid-cols-4 gap-x-4">
      <div className="col-span-3">
        <div className="w-96">
          <Dropdown
            id="sprint-status"
            label="Issue Status"
            options={options}
            onChange={(item) => {
              if (item?.id === 'Unassigned') {
                setValue(null);
              } else {
                setValue(item?.id ?? null);
              }
            }}
            initialOptionId={value}
            displayKey="label"
          />
        </div>
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
