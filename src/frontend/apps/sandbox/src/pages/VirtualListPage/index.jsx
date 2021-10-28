import React, { useEffect, useMemo, useRef, useState } from 'react';
import { loremIpsum } from 'lorem-ipsum';

import './styles.css';
import styled from 'styled-components/macro';

const rowCount = 1000;

const useScroll = () => {
  // set the default scroll top to be 0
  const [scrollTop, setScrollTop] = useState(0);
  // set a ref for the scrollable element
  const ref = useRef();

  // on scroll, update the scroll top state
  const onScroll = (e) => {
    requestAnimationFrame(() => {
      console.log(e.target.scrollTop);
      setScrollTop(e.target.scrollTop);
    });
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    /**
     * The ref value 'ref.current' will likely have changed
     * by the time this effect cleanup function runs.
     * If this ref points to a node rendered by React,
     * copy 'ref.current' to a variable inside the effect,
     * and use that variable in the cleanup function
     */
    const scrollContainer = ref.current;
    // get the current scroll top and set the state
    setScrollTop(scrollContainer.scrollTop);
    // listen for scroll updates
    scrollContainer.addEventListener('scroll', onScroll);

    // on unmount, remove scroll event
    return () => scrollContainer.removeEventListener('scroll', onScroll);
  }, []);

  return [scrollTop, ref];
};

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
  const [scrollTop, ref] = useScroll();
  const totalItems = list.length;
  const totalHeight = totalItems * childHeight;

  // get the start node number based on the scroll top
  const startNumber = Math.floor(scrollTop / childHeight) - renderAhead;
  const startRow = Math.max(0, startNumber);

  // get the number of visible children based on height and child height
  // then add (2 * renderAhead) for padding above and below the viewport
  let visibleNodeCount = Math.ceil(height / childHeight) + 2 * renderAhead;
  // if you are really close to the bottom, then the bottom padding of (renderAhead)
  // will not be necessary. Use this min function
  visibleNodeCount = Math.min(totalItems - startRow, visibleNodeCount);

  // use memo to compute the actual visible list
  // based on the list, the startRow and the visibleNodeCount
  const visibleList = useMemo(() => {
    return list.slice(startRow, startRow + visibleNodeCount);
  }, [startRow, visibleNodeCount, list]);

  // when the visible list is rendered, they will be rendered at the top,
  // causing a scrollTop infinite loop. Use transform to move the visible nodes down
  // using a offset.
  const offsetY = startRow * childHeight;

  return (
    <ScrollContainer $height={height} ref={ref}>
      <Viewport style={{ height: totalHeight, overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleList.map((item) => (
            <div key={item.id} style={{ height: childHeight + 'px', border: '1px solid black' }}>
              <img src={item.image} alt="placeholder" />
              <div>
                {item.text} {item.id + 1}
              </div>
            </div>
          ))}
        </div>
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
