import { Paper } from '@mui/material';
import DataTable from 'components/atoms/DataTable/DataTable.component';
import _ from 'lodash';
import React from 'react';

export default function ListDataTable({
  rows = [],
  columns = [],
  rowCount = 0,
  page = 0,
  pageSize = 25,
  sortBy = '',
  loading = false,
  onPageChange = (page) => {},
  onPageSizeChange = (pageSize) => {},
  onSortChange = (sortBy) => {},
  onRowDoubleClick = () => {},
  sx,
}) {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handlePageSizeChange = (pageSize) => {
    onPageSizeChange(pageSize);
  };

  const handleSortModalChange = (sort) => {
    const sortBy = _.join(
      sort.map((o) => `${o.field}:${o.sort}`),
      ','
    );
    onSortChange(sortBy);
  };

  return (
    <Paper elevation={0} sx={{ flex: '1 1', width: '100%', height: '100%' }}>
      <DataTable
        sx={sx}
        columns={columns}
        rows={rows}
        loading={loading}
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSortModelChange={handleSortModalChange}
        onRowDoubleClick={onRowDoubleClick}
      />
    </Paper>
  );
}
