import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components/macro';

const AccordionContext = createContext();

const Accordion = ({ children, defaultKey }) => {
  const [expandedIndex, setExpandedIndex] = useState(defaultKey);

  return (
    <AccordionContext.Provider value={{ expandedIndex, setExpandedIndex }}>
      <div>{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionTitle = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

Accordion.Title = AccordionTitle;

const AccordionItem = ({ children, itemKey }) => {
  const accordionContext = useContext(AccordionContext);
  const setExpandedIndex = () => {
    if (itemKey === accordionContext.expandedIndex) {
      accordionContext.setExpandedIndex(undefined);
    } else {
      accordionContext.setExpandedIndex(itemKey);
    }
  };
  return (
    <StyledItem $expanded={itemKey === accordionContext.expandedIndex}>
      <StyledSummary>
        <div>{children}</div>
        <div onClick={setExpandedIndex}>+</div>
      </StyledSummary>
    </StyledItem>
  );
};

Accordion.Item = AccordionItem;

const StyledTitle = styled.h2`
  font-size: 20px;
  color: black;
`;

const StyledItem = styled.div`
  color: white;
  background-color: black;
  width: 500px;
  height: ${(props) => (props.$expanded ? '200px' : '30px')};
  box-sizing: border-box;
`;

const StyledSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 15px 0 15px;
  box-sizing: border-box;
`;

export default Accordion;
