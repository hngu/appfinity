import React, {useState, useEffect} from 'react';

enum Status {
  DONE = 'DONE',
  ACTIVE = 'ACTIVE',
}

type GroceryItem = {
  id: string,
  name: string,
  status: Status,
}

const LOCAL_STORAGE_KEY = 'grocery-list-app';

export const Main = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [input, setInput] = useState('');
  const addItem = (item: string) => {
    setItems(prevItems => [
      ...prevItems,
      {
        name: item,
        id: new Date().getTime().toString(),
        status: Status.ACTIVE
      }
    ]);
  };

  useEffect(() => {
    /**
     * get items from local storage
     */
    try {
      setItems(
        JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
        )
      );
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    /**
     * Save items to local storage when items are changed
     */
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const setStatus = (id: string, status = Status.DONE) => {
    const found = items.findIndex(item =>  item.id === id);
    if (found === undefined) {
      return;
    }
    items[found].status = status;
    setItems(prev => [...prev.slice(0, found), items[found], ...prev.slice(found + 1)]);
  };

  const removeItem = (id: string) => {
    const found = items.findIndex(item =>  item.id === id);
    if (found === undefined) {
      return;
    }
    setItems(prev => [...prev.slice(0, found), ...prev.slice(found + 1)]);
  };

  const activeItems = items
    .filter(item => item.status === Status.ACTIVE)
    .map((item) => (
      <li key={item.id}>
        {item.name}
        <button type="button" onClick={() => setStatus(item.id, Status.DONE)}>Done</button>
        <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
      </li>
    ));

  const doneItems = items
    .filter(item => item.status === Status.DONE)
    .map((item) => (
      <li key={item.id}>
        {item.name}
        <button type="button" onClick={() => setStatus(item.id, Status.ACTIVE)}>Promote</button>
        <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
      </li>
    ));
  return (
    <>
      <div>
        <div>Controls</div>
        <div>
          <button type="button" onClick={() => setItems([])}>Remove all</button>
        </div>
      </div>
      <div>Your Grocery List</div>
      <ul>
        {activeItems.length > 0 ? activeItems : 'Your list is empty!'}
      </ul>
      <div>Past Items</div>
      <ul>
        {doneItems.length > 0 ? doneItems : 'Your list is empty!'}
      </ul>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          addItem(input);
          setInput('');
        }}>
          <div>Add Item</div>
          <input type="text"
            name="grocery-item"
            placeholder="Add Grocery Item"
            value={input}
            autoComplete="off"
            onChange={({target: {value}}) => setInput(value)}/>
          <button type="submit">Add Item</button>
        </form>
      </div>
    </>
  );
};