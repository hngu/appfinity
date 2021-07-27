import React from 'react';
import { Button as MUIButton } from '@material-ui/core';

export type Props = {
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
  children?: React.ReactNode;
};

export const Button: React.FC<Props> = ({ children, color }) => {
  return (
    <MUIButton variant="contained" color={color}>
      {children}
    </MUIButton>
  );
};
