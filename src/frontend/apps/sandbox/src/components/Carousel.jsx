import React, { useState } from 'react';
import styled from 'styled-components/macro';

/*
 * - Add current value to render a specific child first
 * - Fix fixed height
 */
const Carousel = ({ children, selectedIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(typeof selectedIndex === 'number' ? selectedIndex : 0);
  const realChildren = React.Children.toArray(children);
  const selectedReactNode = realChildren[currentIndex];

  if (realChildren.length === 0) {
    return null;
  }

  if (selectedIndex < 0 || selectedIndex >= realChildren.length) {
    return null;
  }

  const moveLeft = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(realChildren.length - 1);
    }
  };

  const moveRight = () => {
    if (currentIndex + 1 < realChildren.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <Container>
      <ArrowContainer onClick={moveLeft}> &lt; </ArrowContainer>
      <MainContainer>{selectedReactNode}</MainContainer>
      <ArrowContainer onClick={moveRight}> &gt; </ArrowContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
`;

const ArrowContainer = styled.div`
  height: 100%;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
`;

const MainContainer = styled.div`
  box-sizing: border-box;
  padding: 20px;
  flex: 1;
  height: 100%;
`;

export default Carousel;
