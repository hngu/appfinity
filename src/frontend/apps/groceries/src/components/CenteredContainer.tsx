import React, { FC } from 'react';
import { Container } from '@material-ui/core';

// This should be fixed in later verisons
type Props = {
  children: NonNullable<React.ReactNode>;
};
const CenteredContainer: FC<Props> = ({ children }) => (
  <Container maxWidth="sm" style={{ height: '100vh', position: 'relative', marginTop: '15px' }}>
    {children}
  </Container>
);

export default CenteredContainer;
