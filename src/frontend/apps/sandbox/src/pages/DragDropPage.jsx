import React, { useState } from 'react';
import styled from 'styled-components/macro';

const DragDropPage = () => {
  const [counter, setCounter] = useState(0);
  const [draggable, setDraggable] = useState([
    {
      id: 1,
      name: 'Draggable 1',
    },
    {
      id: 2,
      name: 'Draggable 2',
    },
  ]);
  const [dropped, setDropped] = useState([]);

  const triggerChange = () => {
    setCounter((c) => c + 1);
  };

  const onDragStart = (event, id) => {
    event.dataTransfer.setData('text/plain', id);
  };

  const onDragOver = (event) => event.preventDefault();

  const onDrop = (event) => {
    // get the id from data transfer
    // get a reference to the dropzone via event.target
    // get document by id and append to dropzone
    // clear the datatransfer
    const id = parseInt(event.dataTransfer.getData('text'), 10);
    const draggedItem = draggable.find((item) => item.id === id);
    setDraggable((draggableItems) => draggableItems.filter((item) => item.id != id));
    setDropped((droppedItems) => [...droppedItems, draggedItem]);
    event.dataTransfer.clearData();
  };

  return (
    <>
      <div>
        <Parent>
          <Origin>
            {draggable.map((item) => (
              <Draggable key={item.id} draggable={true} onDragStart={(event) => onDragStart(event, item.id)}>
                {item.name}
              </Draggable>
            ))}
          </Origin>

          <Dropzone onDragOver={onDragOver} onDrop={onDrop}>
            <div>dropzone</div>
            {dropped.map((item) => (
              <Draggable key={item.id}>{item.name}</Draggable>
            ))}
          </Dropzone>
        </Parent>
        <button type="button" onClick={triggerChange}>
          Trigger change
        </button>
        <p>Current count is {counter}</p>
      </div>
    </>
  );
};

const Parent = styled.div`
  border: 2px solid #dfa612;
  color: black;
  display: flex;
  font-family: sans-serif;
  font-weight: bold;
`;

const Origin = styled.div`
  flex-basis: 100%;
  flex-grow: 1;
  padding: 10px;
`;

const Draggable = styled.div`
  background-color: #4aae9b;
  font-weight: normal;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;
`;

const Dropzone = styled.div`
  background-color: #6db65b;
  flex-basis: 100%;
  flex-grow: 1;
  padding: 10px;
`;

export default DragDropPage;

/**
 * Simple Drag and Drop
 *
 * 1. Define the items to be draggable and the dropzone.
 * 2. Set the "draggable" attribute on the draggable items to be "true".
 * 3. Set a onDragStart handler. In this handler, we will use the DataTransfer API and
 * transfer the draggable item's id.
 * 4. By default, divs cannot accept dropped items. Therefore, set a onDragOver handler
 * in the dropzone and prevent default behavior.
 * 5. Set a onDrop event handler in the dropzone and get the id from data transfer and
 * append to the dropzone.
 */
