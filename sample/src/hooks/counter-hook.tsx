import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
  useState,
} from 'react';
// import { flushSync } from 'react-dom';

const contextInitValue = {
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
};

type CounterContextProps = typeof contextInitValue;
type Action = {
  type: 'plus' | 'minus';
  payload: number;
};

const CounterContext = createContext<CounterContextProps>(contextInitValue);

const reducer = (count: number, { type, payload }: Action) => {
  if (type === 'plus') {
    return count + payload;
  }
  if (type === 'minus') {
    return count - payload;
  }
  return count;
};

export const CounterProvider = ({ children }: PropsWithChildren) => {
  // const [count, setCount] = useState(0);

  const [count, dispatch] = useReducer(reducer, 0, () => 0);

  const plusCount = (step: number = 1) => {
    dispatch({ type: 'plus', payload: step });
  };

  const minusCount = (step: number = 1) => {
    dispatch({ type: 'minus', payload: step });
  };

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => useContext(CounterContext);

export const useCount = (defaultValue = 0) => {
  const [count, setCount] = useState(defaultValue);

  const plusCount = (flag = 1) => setCount((pre) => pre + flag);

  return [count, plusCount];
};
