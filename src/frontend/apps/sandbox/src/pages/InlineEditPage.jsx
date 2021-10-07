import React, { useState } from 'react';
import InlineEdit from '../components/InlineEdit';

const InlineEditPage = () => {
  const [name, setName] = useState('Harry');

  return (
    <div>
      Inline edit <InlineEdit name="name" value={name} setValue={setName} />
    </div>
  );
};

export default InlineEditPage;
