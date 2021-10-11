import React, { FC, useEffect, useState } from 'react';
import { Container, CircularProgress, Box, Typography } from '@material-ui/core';

import { GroceryItem } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setGroceries, updateGroceryItem, removeGroceryItem, addGroceryItem, GroceriesState } from '../groceriesSlice';
import { Shown } from '../Shown';
import { LOCAL_STORAGE_KEY } from '../constants';
import GroceryItemsList from '../components/GroceryItemslist';
import GroceryForm from '../components/GroceryForm';

const HomePage: FC = () => {
  const [loading, setLoading] = useState(true);
  const groceries = useAppSelector((state) => state.groceries);
  const dispatch = useAppDispatch();

  const addItem = (item: GroceryItem) => {
    dispatch(addGroceryItem(item));
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
        dispatch(setGroceries(state || ({} as GroceriesState)));
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  return (
    <>
      <Container maxWidth="sm" style={{ height: '100vh', position: 'relative', marginTop: '15px' }}>
        <Shown isVisible={loading}>
          <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <CircularProgress size="100px" />
          </Box>
        </Shown>
        <Shown isVisible={!loading}>
          <Typography variant="h4" style={{ marginBottom: '15px' }}>
            Grocery List
          </Typography>
          <GroceryForm onItemAdd={addItem} />
          <GroceryItemsList items={groceries} onUpdate={updateItem} onDelete={deleteItem} />
        </Shown>
      </Container>
    </>
  );
};

export default HomePage;
