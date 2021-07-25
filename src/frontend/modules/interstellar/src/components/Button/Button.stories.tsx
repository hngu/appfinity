import React from 'react';
import { FButton } from './Button';

export default {
  title: 'Button', // should be unique name
  component: FButton,
};

export const Primary: React.FC = () => {
  return <FButton color="primary">Primary</FButton>;
};

export const Secondary: React.FC = () => {
  return <FButton color="secondary">Secondary</FButton>;
};
