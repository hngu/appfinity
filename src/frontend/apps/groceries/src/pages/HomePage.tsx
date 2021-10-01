import React, { FC, useEffect, useState } from 'react';
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
  CircularProgress,
  Box,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styled from 'styled-components/macro';

import { GroceryItem } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setGroceries, updateGroceryItem, removeGroceryItem } from '../groceriesSlice';
import { Shown } from '../Shown';
import { LOCAL_STORAGE_KEY } from '../constants';

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
  const [loading, setLoading] = useState(true);
  const groceries = useAppSelector((state) => state.groceries);
  const dispatch = useAppDispatch();

  const addItem = (item: GroceryItem) => {
    dispatch(setGroceries([...groceries, item]));
  };

  const updateItem = (item: GroceryItem) => {
    dispatch(updateGroceryItem(item));
  };

  const deleteItem = (item: GroceryItem) => {
    dispatch(removeGroceryItem(item.id));
  };

  useEffect(() => {
    // on page load, get the saved grocery items
    try {
      setLoading(true);
      const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const state = JSON.parse(data);
        dispatch(setGroceries(state?.groceries || ([] as GroceryItem[])));
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  return (
    <Container maxWidth="sm" style={{ height: '100vh', position: 'relative' }}>
      <Shown isVisible={loading}>
        <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <CircularProgress size="100px" />
        </Box>
      </Shown>
      <Shown isVisible={!loading}>
        <GroceryForm onItemAdd={addItem} />
        <GroceryItemsList items={groceries} onUpdate={updateItem} onDelete={deleteItem} />
      </Shown>
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
