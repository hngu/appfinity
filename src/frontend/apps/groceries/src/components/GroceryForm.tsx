import React, { FC, useState } from 'react';
import { Button, Paper, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { GroceryItem } from '../types';

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

export default GroceryForm;
