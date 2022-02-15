import React from 'react';
import Counter from '../components/Counter';
import CounterProvider from '../components/Counter/CounterProvider';

export const ReactContextPage: React.FC = () => {
  return (
    <div>
      <h1>Counter</h1>
      <CounterProvider>
        <Counter />
      </CounterProvider>
    </div>
  );
};
