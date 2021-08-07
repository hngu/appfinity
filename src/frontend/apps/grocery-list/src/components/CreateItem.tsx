import React, {useState} from 'react';
import {Button} from 'interstellar/src/components/Button';

export const CreateItem = () => {
  const [groceryName, setGroceryName] = useState('');
  const [frequency, setFrequency] = useState('manual');
  const [shouldAddToList, setShouldAddToList] = useState(true);

  const handleSubmit = () => {};

  return (
    <>
      <h1>Create Item</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="grocery-item-name" type="input" value={groceryName} onChange={({target: {value}}) => setGroceryName(value)} />
        <br />
        <label>Frequency</label>
        <select name="frequency-type" value={frequency} onChange={({target: {value}}) => setFrequency(value)}>
          <option value="manual">Manual</option>
          <option value="custom">Custom</option>
        </select>
        <br />
        {
          frequency === 'custom' && (
            <div>Show custom options</div>
          )
        }
        <div>
          <input type="checkbox" name="add-to-list" checked={shouldAddToList} onChange={() => setShouldAddToList(prev => !prev)} />
          <label>Add to Current List</label>
        </div>
        <Button>Submit</Button>
      </form>
    </>
  );
};