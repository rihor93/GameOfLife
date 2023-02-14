import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginComponent, { LoginComponentProps } from '../gameOfLife2/LoginComponent';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/LoginComponent',
  component: LoginComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
} as ComponentMeta<typeof LoginComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoginComponent> = (args: LoginComponentProps) => <LoginComponent {...args} />;

export const LoginComponentShow = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LoginComponentShow.args = {
  onClick: (name: string) => { alert('Вы ввели:' + name) }
};