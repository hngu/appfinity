import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TopNavBar: FC<{ onClick: () => void }> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Groceries App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
