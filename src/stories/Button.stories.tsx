import React from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '@src/components/common/Button';

export default {
  title: 'Common/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (props) => (
  <Button {...props} onClick={() => {}}>
    {props.children ?? 'Submit'}
  </Button>
);

export const Primary = Template.bind({});
Primary.args = {};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: (
    <>
      <div className="mr-2">
        <PlusIcon height={16} />
      </div>
      Add Item
    </>
  ),
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  children: <>Add Item</>,
};

export const TextWithIcon = Template.bind({});
TextWithIcon.args = {
  variant: 'text',
  children: (
    <>
      <div className="mr-2">
        <PlusIcon height={16} />
      </div>
      Add Item
    </>
  ),
};

export const Disabled: ComponentStory<typeof Button> = (props) => (
  <div>
    <div className="mb-4">
      <Button isDisabled onClick={() => {}}>
        {props.children ?? 'Submit'}
      </Button>
    </div>
    <Button isDisabled variant="text" onClick={() => {}}>
      {props.children ?? 'Submit'}
    </Button>
  </div>
);
