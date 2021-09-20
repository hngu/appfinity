import React from 'react';
import Accordion from '../components/Accordion';

const AccordionPage = () => {
  return (
    <Accordion>
      <Accordion.Title>This is a title</Accordion.Title>
      <Accordion.Item itemKey={1}>What is this?</Accordion.Item>
      <Accordion.Item itemKey={2}>What is that?</Accordion.Item>
      <Accordion.Item itemKey={3}>What is here?</Accordion.Item>
    </Accordion>
  );
};

export default AccordionPage;
