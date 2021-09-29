import React from 'react';
import Navbar from '../components/Navbar';
import Dropdown from '../components/Dropdown';

const NavBarPage = () => {
  return (
    <>
      <Navbar />
      <Dropdown title="test">
        <Dropdown.Item href="#test1">Test 1</Dropdown.Item>
        <Dropdown.Item href="#test2">Test 2</Dropdown.Item>
        <Dropdown.Item href="#test3">Test 3</Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default NavBarPage;
