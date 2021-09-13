import React, { useState } from 'react';
import { flatten } from '../utils/arrayUtils';

const nested = [1, 2, 3, [4, 5, 6, [7, 8, 9], [10], [11]], [12]];
const UtilsPage = () => {
  return (
    <div>
      <div>
        <h2>Nested</h2>
        <div>Before: {JSON.stringify(nested)}</div>
        <div>After: {JSON.stringify(flatten(nested))}</div>
      </div>
    </div>
  );
};

export default UtilsPage;
