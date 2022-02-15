import { useContext } from 'react';
import { CounterContext, CounterType } from '.';

// Too easy to do it
export const useCounterContext = (): CounterType => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounterContext must be used within a CounterContextProvider');
  }

  return context;
};
