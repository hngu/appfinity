import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

import { GroceryItem } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateGroceryItem, removeGroceryItem, addGroceryItem } from '../groceriesSlice';
import GroceryItemsList from '../components/GroceryItemslist';
import GroceryForm from '../components/GroceryForm';
import CenteredContainer from '../components/CenteredContainer';

const HomePage: FC = () => {
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
  return (
    <>
      <CenteredContainer>
        <Typography variant="h4" style={{ marginBottom: '15px' }}>
          Grocery List
        </Typography>
        <GroceryForm onItemAdd={addItem} />
        <GroceryItemsList items={groceries} onUpdate={updateItem} onDelete={deleteItem} />
      </CenteredContainer>
    </>
  );
};

export default HomePage;
