import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CellComponent, Cell, CellStatus } from '../gameOfLife/components/CellComponent';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Cell',
  component: CellComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    Cell: { id: 25, status: CellStatus.Alive },
  },
} as ComponentMeta<typeof CellComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CellComponent> = (args) => <CellComponent {...args} />;

export const AliveCell = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AliveCell.args = {
    value: {
        id: 1,
        status: CellStatus.Alive
    }
};

export const AliveOldCell = Template.bind({});
AliveOldCell.args = {
    value: {
        id: 25,
        status: CellStatus.AliveOld
    }
};

export const DeadCell = Template.bind({});
DeadCell.args = {
    value: {
        id: 47,
        status: CellStatus.Dead
    }
};
