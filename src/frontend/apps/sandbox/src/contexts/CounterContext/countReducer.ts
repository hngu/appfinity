import { CounterActionEnum, CounterType, ActionType } from '.';

export const countReducer = (state: CounterType['state'], action: ActionType): CounterType['state'] => {
  switch (action.type) {
    case CounterActionEnum.INCREMENT: {
      return {
        count: state.count + 100,
      };
    }
    case CounterActionEnum.DECREMENT: {
      return {
        count: state.count - 100,
      };
    }
    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};
