import React, { FC, useState } from 'react';
import CenteredContainer from '../components/CenteredContainer';
import { Typography, IconButton } from '@material-ui/core';
import { DataGrid, GridRowId } from '@material-ui/data-grid';
import { MoveToInbox, Delete } from '@material-ui/icons';
import { useAppSelector, useAppDispatch } from '../hooks';
import { permanentDeleteItems, moveDeletedItemsToList } from '../groceriesSlice';

const columns = [{ field: 'name', headerName: 'Grocery Item', width: 200 }];

const RemovedItemsPage: FC = () => {
  const pastGroceries = useAppSelector((state) => state.pastGroceries);
  const dispatch = useAppDispatch();
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);
  const hasSeletedItems = selectedIds.length > 0;

  const handleMoveToList = () => {
    dispatch(moveDeletedItemsToList(selectedIds as string[]));
  };

  const handlePermanentDelete = () => {
    dispatch(permanentDeleteItems(selectedIds as string[]));
  };

  return (
    <CenteredContainer>
      <Typography variant="h4" style={{ marginBottom: '15px' }}>
        Your Removed Items
      </Typography>
      <IconButton onClick={handleMoveToList} disabled={!hasSeletedItems}>
        <MoveToInbox />
      </IconButton>
      <IconButton onClick={handlePermanentDelete} disabled={!hasSeletedItems}>
        <Delete />
      </IconButton>
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
