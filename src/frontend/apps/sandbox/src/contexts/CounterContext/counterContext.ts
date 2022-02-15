import { createContext } from 'react';

export enum CounterActionEnum {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export type ActionType = {
  type: CounterActionEnum;
};

// Our state and dispatch
export type CounterType = {
  state: {
    count: number;
  };
  dispatchCount: (action: ActionType) => void;
};

export const CounterContext = createContext<CounterType | null>(null);

// Provide better visualization experience in react-dev-tools
CounterContext.displayName = 'CounterContext';
