import React from 'react';
import styled from 'styled-components/macro';

export const TicTacToeBoard = ({ matrix, onClick }) => {
  return (
    <StyledBoard>
      {matrix.map((row, mIndex) =>
        row.map((item, rIndex) => (
          <Cell key={`${mIndex}_${rIndex}`} onClick={() => onClick(mIndex, rIndex)}>
            {item}
          </Cell>
        )),
      )}
    </StyledBoard>
  );
};

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  max-width: 600px;
  height: 600px;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  cursor: pointer;
  font-size: 40px;

  &:nth-child(3n) {
    border-right: none;
  }

  &:nth-last-child(-n + 3) {
    border-bottom: none;
  }
`;
