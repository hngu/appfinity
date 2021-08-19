import React, { FC } from 'react';
import styled from 'styled-components/macro';

// TODO: must have an id set for this star rating
export const StarRating: FC = () => {
  return (
    <StarsContainer>
      <input type="radio" name="stars" id="star-5" value="5" />
      <label htmlFor="star-5"></label>
      <input type="radio" checked name="stars" id="star-4" value="4" />
      <label htmlFor="star-4"></label>
    </StarsContainer>
  );
};

const StarsContainer = styled.div`
  position: relative;
  input {
    display: none;

    &:checked ~ label:before {
      content: '\\2605';
    }
  }

  & > label {
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: orange;
    font-family: Verdana;
    position: relative;

    &::before {
      content: '\\2606';
      position: absolute;
      top: 0;
      line-height: 26px;
    }
  }
`;
