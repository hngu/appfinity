import React from 'react';
import styled from 'styled-components/macro';

export const Center: React.FC = ({ children }) => {
  return <StyledCenter>{children}</StyledCenter>;
};

const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
