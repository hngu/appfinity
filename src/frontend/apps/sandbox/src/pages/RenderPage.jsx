import React, { useCallback, useMemo, useState } from 'react';

export const RenderPage = () => {
  const [_, setCounter] = useState(0);
  console.log('Page render');
  return (
    <>
      <div>
        <h2>Renders</h2>
        <button onClick={() => setCounter((c) => c + 1)}>Update state</button>
        <MemoizedComponentA />
      </div>
      <div>
        <UseCallbackExample />
      </div>
    </>
  );
};

const ComponentA = () => {
  const [_, setCounter] = useState(0);
  console.log('ComponentA render');

  return (
    <div>
      <h2>Component A</h2>
      <button onClick={() => setCounter((c) => c + 1)}>Update state</button>
      <MemoizedComponentB />
    </div>
  );
};

const ComponentB = () => {
  const [_, setCounter] = useState(0);
  console.log('ComponentB render');

  return (
    <div>
      <h2>Component B</h2>
      <button onClick={() => setCounter((c) => c + 1)}>Update state</button>
      <MemoizedComponentC />
    </div>
  );
};

const ComponentC = () => {
  const [_, setCounter] = useState(0);
  console.log('ComponentC render');

  return (
    <div>
      <h2>Component C</h2>
      <button onClick={() => setCounter((c) => c + 1)}>Update state</button>
    </div>
  );
};

const MemoizedComponentA = React.memo(ComponentA /* optional comparison function with prevProps, nextProps */);
const MemoizedComponentB = React.memo(ComponentB);
const MemoizedComponentC = React.memo(ComponentC);

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const callback = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);
  return (
    <div>
      <div>{count}</div>
      <button onClick={callback}>test</button>
      <ExpensiveComponent callback={callback} />
    </div>
  );
};

const ExpensiveComponent = ({ callback }) => {
  // return useMemo(() => {
  //   for (let i = 0; i < 1000000000; i++) {}
  //   return <button onClick={callback}>Click me</button>;
  // }, [callback]);

  for (let i = 0; i < 1000000000; i++) {}
  return <button onClick={callback}>Click me</button>;
};