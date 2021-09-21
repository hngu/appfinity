import React, { FC, useState } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Paper,
  InputBase,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { GroceryItem } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setGroceries } from '../groceriesSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: '2px',
    paddingBottom: '2px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const HomePage: FC = () => {
  const groceries = useAppSelector((state) => state.groceries);
  const dispatch = useAppDispatch();
  const addItem = (item: GroceryItem) => {
    dispatch(setGroceries([...groceries, item]));
  };
  return (
    <Container maxWidth="sm">
      <GroceryForm onItemAdd={addItem} />
      <GroceryItemsList items={groceries} />
    </Container>
  );
};

export default HomePage;

const GroceryForm: FC<{ onItemAdd: (item: GroceryItem) => void }> = ({ onItemAdd }) => {
  const classes = useStyles();
  const [item, setItem] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!item.trim()) {
      return '';
    }
    onItemAdd({
      id: new Date().getTime().toString(),
      name: item.trim(),
      isCompleted: false,
      isDeleted: false,
    });
    setItem('');
  };
  return (
    <form onSubmit={onSubmit}>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          inputProps={{ 'aria-label': 'add grocery item' }}
          value={item}
          placeholder="Add Grocery Item"
          onChange={(event) => setItem(event.target.value)}
        />
        <Button type="submit" color="primary">
          <AddCircleIcon />
        </Button>
      </Paper>
    </form>
  );
};

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
