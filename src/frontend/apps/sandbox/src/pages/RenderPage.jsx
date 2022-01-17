import React, { useCallback, useContext, useState } from 'react';

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
      <div>
        <h2>React Context</h2>
        <div>
          <ParentComponent>
            <ChildComponent />
          </ParentComponent>
        </div>
      </div>
      <div>
        <h2>Add Delete Items</h2>
        <AddDeleteItems />
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

const ParentChildContext = React.createContext();

const ParentComponent = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const value = {
    counter,
    setCounter,
  };
  return <ParentChildContext.Provider value={value}>{children}</ParentChildContext.Provider>;
};

const ChildComponent = () => {
  const { counter, setCounter } = useContext(ParentChildContext);
  return (
    <div>
      <button onClick={() => setCounter((c) => c + 1)}>{counter}</button>
    </div>
  );
};

const AddDeleteItems = () => {
  const [list, setList] = useState([]);
  const [text, setText] = useState('');

  const addItem = () => {
    setList([...list, text]);
    setText('');
  };

  const removeItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <>
      <div>
        <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
        <button onClick={addItem}>Add</button>
      </div>
      <ul>
        {list.map((item, index) => (
          <li key={index} onClick={() => removeItem(index)}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
