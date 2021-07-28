import React from 'react';
import { Story } from '@storybook/react';
import { Button, Props } from './Button';
import { Center } from '../utils/Center/Center';

import { addDecorator } from '@storybook/react';

type DecoratorFunction = Parameters<typeof addDecorator>[0];

export interface StoryMetadata {
  component: React.ReactNode;
  title: string;
  decorators?: DecoratorFunction[];
}

export default {
  title: 'Inputs/Button', // should be unique name
  component: Button,
  decorators: [(storyFn) => <Center>{storyFn()}</Center>],
} as StoryMetadata;

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
