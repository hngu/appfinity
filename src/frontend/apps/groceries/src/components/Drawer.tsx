import React, { FC } from 'react';
import { Drawer as MuiDrawer, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240;

type Path = {
  name: string;
  url: string;
};

const PATHS: Path[] = [
  {
    name: 'Grocery List',
    url: '/',
  },
  {
    name: 'Removed Items',
    url: '/removed',
  },
  {
    name: 'Settings',
    url: '/settings',
  },
  {
    name: 'Add Item',
    url: '/add',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Drawer: FC<{ handleDrawerClose: () => void; open: boolean; onNavItemClick: (url: string) => void }> = ({
  open,
  handleDrawerClose,
  onNavItemClick,
}) => {
  const classes = useStyles();
  return (
    <MuiDrawer
      className={classes.drawer}
      variant="persistent"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {PATHS.map(({ name, url }) => (
          <ListItem button key={name}>
            <ListItemText primary={name} onClick={() => onNavItemClick(url)} />
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
