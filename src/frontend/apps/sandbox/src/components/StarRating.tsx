import React, { FC } from 'react';
import styled from 'styled-components/macro';

// TODO: must have an id set for this star rating
export const StarRating: FC = () => {
  return (
    <StarsContainer>
      <input type="radio" name="stars" id="star-5" value="5" />
      <label htmlFor="star-5"></label>
    </StarsContainer>
  );
};

const StarsContainer = styled.div`
  input {
    display: none;
  }
`;
