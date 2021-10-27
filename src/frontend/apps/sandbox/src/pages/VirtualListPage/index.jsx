import React, { useMemo } from 'react';
import { loremIpsum } from 'lorem-ipsum';

import './styles.css';
import styled from 'styled-components/macro';

const rowCount = 1000;

const VirtualListPage = () => {
  const list = useMemo(() => {
    return Array(rowCount)
      .fill()
      .map((_, idx) => {
        return {
          id: idx,
          name: 'John Doe',
          image: 'http://via.placeholder.com/40',
          text: loremIpsum({
            count: 1,
            units: 'sentences',
            sentenceLowerBound: 4,
            sentenceUpperBound: 8,
          }),
        };
      });
  }, []);

  return (
    <>
      <h2>Large Dataset</h2>
      <VirtualScroll list={list} height={300} childHeight={60} />
    </>
  );
};

const VirtualScroll = ({ list, height, childHeight, renderAhead = 20 }) => {
  // get the number of visible children based on height and child height
  // then add (2 * renderAhead) for padding above and below the viewport
  const visibleNodeCount = Math.ceil(height / childHeight) + 2 * renderAhead;

  const visibleList = list.slice(0, visibleNodeCount);
  const totalHeight = list.length * childHeight;
  return (
    <ScrollContainer $height={height}>
      <Viewport style={{ height: totalHeight }}>
        {visibleList.map((item) => (
          <div key={item.id} style={{ height: childHeight + 'px', border: '1px solid black' }}>
            <img src={item.image} alt="placeholder" />
            <div>
              {item.text} {item.id + 1}
            </div>
          </div>
        ))}
      </Viewport>
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  overflow: auto;
  position: relative;
  height: ${(props) => (props.$height ? props.$height + 'px' : 'auto')};
`;

const Viewport = styled.div`
  position: relative;
  overflow: hidden;
`;

export default VirtualListPage;
