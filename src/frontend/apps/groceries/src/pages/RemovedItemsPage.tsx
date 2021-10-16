import React, { FC, useState } from 'react';
import CenteredContainer from '../components/CenteredContainer';
import { Typography } from '@material-ui/core';
import { DataGrid, GridRowId } from '@material-ui/data-grid';
import { useAppSelector } from '../hooks';
import { Shown } from '../Shown';

const columns = [{ field: 'name', headerName: 'Grocery Item', width: 200 }];

const RemovedItemsPage: FC = () => {
  const pastGroceries = useAppSelector((state) => state.pastGroceries);
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);
  return (
    <CenteredContainer>
      <Typography variant="h4" style={{ marginBottom: '15px' }}>
        Your Removed Items
      </Typography>
      <Shown isVisible={selectedIds.length > 0}>
        <button>Test</button>
      </Shown>
      <DataGrid
        rows={pastGroceries}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(selectionModel) => setSelectedIds(selectionModel)}
      />
    </CenteredContainer>
  );
};

export default RemovedItemsPage;
