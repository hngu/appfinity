import React from 'react';
import { Button as MUIButton } from '@material-ui/core';

export type ButtonProps = {
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
  children?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ children, color }) => {
  return (
    <MUIButton variant="contained" color={color}>
      {children}
    </MUIButton>
  );
};
