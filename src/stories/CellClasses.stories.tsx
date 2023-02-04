import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CellComponentClasses, Cell, CellStatus, Props } from '../gameOfLifeClasses/CellComponentClasses';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/CellClasses',
    component: CellComponentClasses,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        Cell: { id: 25, status: CellStatus.Alive },
    },
} as ComponentMeta<typeof CellComponentClasses>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CellComponentClasses> = (args: Props) => <CellComponentClasses {...args} />;

export const AliveCell = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AliveCell.args = {

    id: 1,
    status: CellStatus.Alive

};

export const AliveOldCell = Template.bind({});
AliveOldCell.args = {
    id: 25,
    status: CellStatus.AliveOld

};

export const DeadCell = Template.bind({});
DeadCell.args = {
    id: 47,
    status: CellStatus.Dead

};
