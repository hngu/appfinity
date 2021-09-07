import React, { useMemo } from 'react';
import { loremIpsum } from 'lorem-ipsum';

import './styles.css';

const rowCount = 1000;

const VirtualListPage = () => {
  const list = useMemo(() => {
    return Array(rowCount)
      .fill()
      .map((val, idx) => {
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
      {list.map(renderRow)}
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
