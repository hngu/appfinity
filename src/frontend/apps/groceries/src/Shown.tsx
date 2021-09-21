import React, { FC } from 'react';

type Props = {
  isVisible: boolean;
};

export const Shown: FC<Props> = ({ children, isVisible }) => {
  if (isVisible) {
    return <>{children}</>;
  }

  return null;
};
