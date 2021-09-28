import React from 'react';
import Carousel from '../components/Carousel';

const CarouselPage = () => {
  return (
    <div style={{ height: '400px' }}>
      <Carousel selectedIndex={2}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    </div>
  );
};

export default CarouselPage;
