import React from 'react';
import Carousel from '../components/Carousel';

const CarouselPage = () => {
  return (
    <div style={{ height: '400px' }}>
      <Carousel selectedIndex={0}>
        <div>Slide 1</div>
      </Carousel>
    </div>
  );
};

export default CarouselPage;
