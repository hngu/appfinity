import React, { useState } from 'react';
import styled from 'styled-components/macro';

const InlineEdit = ({ value, setValue, ...props }) => {
  const [editingValue, setEditingValue] = useState(value);
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const onBlur = (e) => {
    const textValue = e.target.value.trim();
    if (textValue === '') {
      setEditingValue(value);
    } else {
      setValue(editingValue);
    }
  };

  return (
    <StyledInput
      {...props}
      value={editingValue}
      onChange={(e) => setEditingValue(e.target.value)}
      autoComplete="off"
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};

const StyledInput = styled.input`
  background: transparent;
  border: 0;
  padding: 8px;

  :hover {
    background: #d3d3d3;
    cursor: pointer;
  }
`;

export default InlineEdit;
