import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Dropdown from '@src/components/common/Forms/Dropdown';
import IssueAssigneeSelectorView, {
  IssueAssigneeValue,
} from '@src/components/pages/issue/IssueAssigneeSelectorView';
import mockOptions from '@src/mocks/issueAssigneeView.mock.json';

export default {
  title: 'Issues/IssueAssigneeSelector',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = () => {
  const [value, setValue] = useState<string | null>(null);
  const [options, setOptions] = useState<IssueAssigneeValue[]>([]);

  return (
    <div className="grid grid-rows-1 grid-cols-4 gap-x-4">
      <div className="col-span-3">
        <div className="w-96">
          <IssueAssigneeSelectorView
            onChange={(value) => {
              setValue(value);
              return Promise.resolve();
            }}
            onOpen={() => {
              setTimeout(() => {
                setOptions(mockOptions);
              }, 0);
            }}
            initialAssignee={null}
            values={options}
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
