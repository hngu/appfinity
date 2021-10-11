import React, { useState, FC } from 'react';
import TopNavBar from './TopNavBar';
import Drawer from './Drawer';
import { useHistory } from 'react-router-dom';

const NavControl: FC = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onNavItemClick = (url: string) => {
    setOpen(false);
    history.push(url);
  };
  return (
    <>
      <TopNavBar onClick={handleDrawerOpen} />
      <Drawer open={open} handleDrawerClose={handleDrawerClose} onNavItemClick={onNavItemClick} />
    </>
  );
};

export default NavControl;
