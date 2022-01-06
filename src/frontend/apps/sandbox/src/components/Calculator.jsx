import React, { useRef, useState } from 'react';
import styled from 'styled-components/macro';
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '/', '*', '='];

export const Calculator = () => {
  const [display, setDisplay] = useState(0);
  const stackRef = useRef([]);

  const evalExpression = () => {
    const stack = stackRef.current;
    const answer = eval(stack.join(''));
    emptyStack();
    stack.push(answer);
  };

  const emptyStack = () => {
    const stack = stackRef.current;
    stack.splice(0, stack.length);
  };

  const onNumberClick = (number) => {
    const stack = stackRef.current;
    if (!stackRef.current.length) {
      stack.push(number);
    } else {
      const topNum = stack[stack.length - 1];
      if (operators.includes(topNum)) {
        stack.push(number);
      } else {
        stack.pop();
        stack.push(topNum * 10 + number);
      }
    }

    setDisplay(stack[stack.length - 1]);
  };

  const onOperatorClick = (operator) => {
    const stack = stackRef.current;
    if (!stack.length || operators.includes(stack[stack.length - 1])) {
      emptyStack();
      setDisplay('NaN');
      return;
    }
    evalExpression();
    const answer = stack[stack.length - 1];
    if (operator != '=') {
      stack.push(operator);
    } else {
      emptyStack();
    }
    setDisplay(answer);
  };

  const clearExpression = () => {
    emptyStack();
    setDisplay(0);
  };

  return (
    <>
      <Display>{display}</Display>
      <Grid>
        {numbers.map((number) => (
          <NumberButton key={number} onClick={() => onNumberClick(number)}>
            {number}
          </NumberButton>
        ))}
        {operators.map((operator) => (
          <OperatorButton key={operator} onClick={() => onOperatorClick(operator)}>
            {operator}
          </OperatorButton>
        ))}
      </Grid>
      <button onClick={clearExpression}>Clear</button>
    </>
  );
};

const Display = styled.div`
  width: 200px;
  background-color: grey;
  color: white;
  height: 25px;
  text-align: right;
  padding: 5px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 200px;
`;

const NumberButton = styled.button`
  background-color: grey;
  color: white;
  border-radius: 0;
  cursor: pointer;
`;

const OperatorButton = styled.button`
  background-color: orange;
  color: white;
  border-radius: 0;
  cursor: pointer;
`;
