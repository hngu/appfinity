import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import CenteredContainer from '../components/CenteredContainer';
import { useAppDispatch } from '../hooks';
import { setGroceries } from '../groceriesSlice';

export const SettingsPage: FC = () => {
  const dispatch = useAppDispatch();

  const clearStorage = () => {
    dispatch(setGroceries({ groceries: [], pastGroceries: [] }));
  };
  return (
    <CenteredContainer>
      <Button color="primary" variant="contained" onClick={clearStorage}>
        Clear Storage
      </Button>
    </CenteredContainer>
  );
};
