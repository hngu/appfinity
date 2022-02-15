import React, { useMemo, useReducer, ReactNode } from 'react';
import { CounterContext, countReducer } from '../../contexts';

import type { CounterType } from '../../contexts';

type CounterProviderProps = {
  children: ReactNode;
};

const CounterProvider: React.FC<CounterProviderProps> = ({ children }) => {
  const [state, dispatchCount] = useReducer<typeof countReducer, CounterType['state']>(
    countReducer,
    { count: 0 },
    (state) => state,
  );

  const value = useMemo(() => ({ state, dispatchCount }), [state]);

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
};

export default CounterProvider;
