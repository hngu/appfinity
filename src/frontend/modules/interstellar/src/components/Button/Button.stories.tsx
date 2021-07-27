import React from 'react';
import { Story } from '@storybook/react';
import { Button, Props } from './Button';

export default {
  title: 'Inputs/Button', // should be unique name
  component: Button,
};

const Template: Story<Props> = (args) => <Button {...args} />;

export const Primary: Story<Props> = Template.bind({});
Primary.args = {
  color: 'primary',
  children: 'Primary',
};

export const Secondary: Story<Props> = Template.bind({});
Secondary.args = {
  color: 'secondary',
  children: 'Secondary',
};
