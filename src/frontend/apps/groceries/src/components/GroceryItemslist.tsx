import React, { FC } from 'react';
import { List, ListItem, ListItemText, Checkbox, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import styled from 'styled-components/macro';

import { GroceryItem } from '../types';

const GroceryItemsList: FC<{
  items: GroceryItem[];
  onUpdate: (item: GroceryItem) => void;
  onDelete: (item: GroceryItem) => void;
}> = ({ items, onUpdate, onDelete }) => {
  const toggleCompleted = (groceryItem: GroceryItem) => {
    onUpdate({
      ...groceryItem,
      isCompleted: !groceryItem.isCompleted,
    });
  };

  const deleteItem = (item: GroceryItem) => onDelete(item);
  return (
    <>
      <List>
        {items.map((item) => {
          return (
            <ListItem key={item.id} role={undefined} dense button onClick={() => toggleCompleted(item)}>
              <Checkbox edge="start" tabIndex={-1} disableRipple checked={item.isCompleted} />
              <StyledListItemText $isCompleted={item.isCompleted} id={item.id} primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

const StyledListItemText = styled(ListItemText)<{ $isCompleted?: boolean }>`
  ${(props) => (props.$isCompleted ? 'text-decoration: line-through;' : '')}
`;

export default GroceryItemsList;
