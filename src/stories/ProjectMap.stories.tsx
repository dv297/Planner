import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import EditableTextDisplay from '../components/common/EditableDisplays/EditableTextDisplay';
import ProjectMap from '../components/ProjectMap/ProjectMap';
import getEdgesMockData from '../mocks/getEdges.mock.json';
import getPositionsMockData from '../mocks/getPositions.mock.json';
import getTaskMockData from '../mocks/getTask.mock.json';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'common/ProjectMap',
  component: ProjectMap,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ProjectMap>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableTextDisplay> = () => (
  <div className="h-screen w-screen">
    <ProjectMap
      issues={getTaskMockData.data.issues}
      positions={getPositionsMockData.positions}
      edgesSet={getEdgesMockData.data.edges}
    />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
