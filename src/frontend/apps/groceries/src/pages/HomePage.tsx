import React, { FC, useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import styled from 'styled-components/macro';
import { GroceryItem } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setGroceries } from '../groceriesSlice';

const HomePage: FC = () => {
  const groceries = useAppSelector((state) => state.groceries);
  const dispatch = useAppDispatch();
  const addItem = (item: GroceryItem) => {
    dispatch(setGroceries([...groceries, item]));
  };
  return (
    <div>
      <GroceryForm onItemAdd={addItem} />
      <GroceryItemsList items={groceries} />
    </div>
  );
};

export default HomePage;

const GroceryForm: FC<{ onItemAdd: (item: GroceryItem) => void }> = ({ onItemAdd }) => {
  const [item, setItem] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onItemAdd({
      id: new Date().getTime().toString(),
      name: item,
      isCompleted: false,
      isDeleted: false,
    });
    setItem('');
  };
  return (
    <form onSubmit={onSubmit}>
      <StyledGroceryTextField
        variant="outlined"
        size="small"
        value={item}
        onChange={(event) => setItem(event.target.value)}
      />
      <Button variant="contained" type="submit" color="primary">
        Add
      </Button>
    </form>
  );
};

const StyledGroceryTextField = styled(TextField)`
  && {
    margin-right: 10px;
  }
`;

const GroceryItemsList: FC<{ items: GroceryItem[] }> = ({ items }) => {
  return (
    <>
      <List>
        {items.map((item) => {
          return (
            <ListItem key={item.id} role={undefined} dense button>
              <Checkbox edge="start" tabIndex={-1} disableRipple checked={item.isCompleted} />
              <ListItemText id={item.id} primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
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
