import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BoardComponent from '../gameOfLife2/BoardComponent';
import { number } from 'prop-types';




// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/BoardComponent',
    component: BoardComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        width: number,
        heigth: number,
    },
} as ComponentMeta<typeof BoardComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BoardComponent> = (args: { width: number, heigth: number }) => <BoardComponent {...args} />;

export const BoardComponentOne = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BoardComponentOne.args = {

    width: 10,
    heigth: 10,

};

export const BoardComponentTwo = Template.bind({});
BoardComponentTwo.args = {
    width: 25,
    heigth: 25,

};

export const BoardComponentTree = Template.bind({});
BoardComponentTree.args = {
    width: 50,
    heigth: 50,

};

