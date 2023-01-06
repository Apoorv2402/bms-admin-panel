import { Button, Dialog, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { axiosRequest } from 'common/api/axios.request';
import DataTable from 'components/atoms/DataTable/DataTable.component';

export default function FormFieldLookupModal({
  lookup = {},
  open,
  onClose = () => {},
  onSelect = (value) => {},
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [sortBy, setSortBy] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchTextState, setSearchTextState] = useState('');
  const [rowCount, setRowCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState({});

  const getLookupData = useCallback(async () => {
    try {
      setLoading(true);
      const path = `${lookup.path}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&search=${searchText}`;
      const resp = await axiosRequest().get(path);
      setRows(_.get(resp, 'data.data'));
      setRowCount(_.get(resp, 'data.meta.pagination.rowCount') || 0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [lookup.path, page, pageSize, sortBy, searchText]);

  useEffect(() => {
    getLookupData();
  }, [getLookupData, lookup.path, page, pageSize, sortBy, searchText]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleRowDoubleClick = (row) => {
    setSelectedRow(row);
    onSelect(_.get(row, `row.${lookup.key}`));
    onClose();
  };

  const handleSelect = () => {
    onSelect(_.get(selectedRow, `row.${lookup.key}`));
    onClose();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(searchTextState);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchTextState('');
    setSearchText('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: '10px' }}>
        <Typography variant="h5" align="center">
          Lookup: {lookup.title}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            width: '100%',
            my: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextField
            label="Search"
            size="small"
            value={searchTextState}
            sx={{ width: '250px', '& input': { fontWeight: 'bold' } }}
            onChange={(e) => setSearchTextState(e.target.value)}
          />
          <Button variant="outlined" size="small" onClick={handleReset}>
            Reset
          </Button>
        </Box>
        <Box sx={{ height: '300px' }}>
          <DataTable
            sx={lookup.sx}
            columns={lookup.columns || []}
            rows={rows}
            loading={loading}
            page={page}
            pageSize={pageSize}
            rowCount={rowCount}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onSortModelChange={setSortBy}
            onRowDoubleClick={handleRowDoubleClick}
            onRowClick={handleRowClick}
          />
        </Box>
      </Box>
      <Box sx={{ m: '10px', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button variant="outlined" size="medium" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" size="medium" onClick={handleSelect} autoFocus>
          Select
        </Button>
      </Box>
    </Dialog>
  );
}
