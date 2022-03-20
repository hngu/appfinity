import React from 'react';

import { CounterActionEnum, useCounterContext } from '../../contexts';

const Counter: React.FC = () => {
  const {
    state: { count },
    dispatchCount,
  } = useCounterContext();

  // Trigger！
  const handleIncrement = () => {
    dispatchCount({
      type: CounterActionEnum.INCREMENT,
    });
  };

  const handleDecrement = () => {
    dispatchCount({
      type: CounterActionEnum.DECREMENT,
    });
  };

  return (
    <>
      <span>count - {count}</span>
      <br />
      <button onClick={handleIncrement}>increment</button> <button onClick={handleDecrement}>decrement</button>
    </>
  );
};

export default Counter;
