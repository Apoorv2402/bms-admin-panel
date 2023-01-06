import { Box } from '@mui/material';
import DataTable from 'components/atoms/DataTable/DataTable.component';
import React from 'react';

export default function EditableDataTable({ sxBox, sxHeader, sxFooter, sxTable, ...rest }) {
  return (
    <Box sx={{ margin: 1, width: 'calc(100% - 15px)', height: 'calc(100% - 100px)' }}>
      <header>header</header>
      <DataTable sx={sxTable} {...rest} />
    </Box>
  );
}
