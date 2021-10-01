import React, { useMemo } from 'react';
import { loremIpsum } from 'lorem-ipsum';
import styled from 'styled-components/macro';

import './styles.css';

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
      <VirtualList items={list} rowHeight={67} />
    </>
  );
};

export default VirtualListPage;

const renderRow = (item) => {
  return (
    <div key={item.id} className="row">
      <div className="image">
        <img src={item.image} alt="" />
      </div>
      <div className="content">
        <div>{item.name}</div>
        <div>{item.text}</div>
      </div>
    </div>
  );
};

const VirtualList = ({ items, containerHeight = 400, rowHeight }) => {
  const totalHeight = rowHeight * items.length;
  // show visible items with 20 item buffer
  const visibleItemCount = Math.ceil(containerHeight / rowHeight) + 20;
  const leftOverHeight = totalHeight - visibleItemCount * rowHeight;
  const visibleItems = items.slice(0, visibleItemCount);
  return (
    <ListContainer containerHeight={containerHeight}>
      {visibleItems.map(renderRow)}
      <div style={{ height: `${leftOverHeight}px` }}></div>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  overflow: auto;
  height: ${(props) => props.containerHeight}px;
  border: 1px solid black;
`;
