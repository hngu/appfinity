import React from 'react';
import { Button } from '@material-ui/core';

type Props = {
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
  children?: React.ReactNode;
};

export const FButton: React.FC<Props> = ({ children, color }) => {
  return (
    <Button variant="contained" color={color}>
      {children}
    </Button>
  );
};
