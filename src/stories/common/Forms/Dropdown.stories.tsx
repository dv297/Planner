import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Dropdown from '@src/components/common/Forms/Dropdown';

export default {
  title: 'Common/Forms/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = () => {
  const [value, setValue] = useState(null);
  return (
    <div className="grid grid-rows-1 grid-cols-4 gap-x-4">
      <div className="col-span-3">
        <div className="w-96">
          <Dropdown
            id="sprint-status"
            label="Issue Status"
            options={[
              { label: 'Unassigned', value: 'Unassigned' },
              { label: 'In Planning', value: 'In Planning' },
              { label: 'Not Started', value: 'Not Started' },
              { label: 'In Progress', value: 'In Progress' },
              { label: 'Ready for Review', value: 'Ready for Review' },
              { label: 'Complete', value: 'Complete' },
            ]}
            onChange={(item) => {
              if (item?.value === 'Unassigned') {
                setValue(null);
              } else {
                setValue(item?.value);
              }
            }}
            initialValue={value ? value : 'Unassigned'}
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
