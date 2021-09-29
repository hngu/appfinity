import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';

const Dropdown = ({ children, title }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const onPageClickHandler = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      }
      setShowMenu(false);
    };

    if (showMenu) {
      window.addEventListener('click', onPageClickHandler);
    }

    return () => {
      /**
       * useEffect cleanup runs after any dependencies change
       * So this is why this will work
       */
      window.removeEventListener('click', onPageClickHandler);
    };
  }, [showMenu, menuRef]);

  return (
    <Container>
      <button onClick={() => setShowMenu((prev) => setShowMenu(!prev))}>{title}</button>
      {showMenu ? <Menu ref={menuRef}>{children}</Menu> : null}
    </Container>
  );
};

Dropdown.Item = function DropdownItem({ children, ...restProps }) {
  return <MenuItem {...restProps}>{children}</MenuItem>;
};

const Container = styled.div`
  position: relative;
`;

const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 3px 5px;
`;

const MenuItem = styled.a`
  cursor: pointer;
  display: block;
  :hover {
    background-color: gray;
  }
`;

export default Dropdown;
