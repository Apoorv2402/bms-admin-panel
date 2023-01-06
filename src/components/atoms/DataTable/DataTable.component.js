import React from 'react';
import { DataGridPremium } from '@mui/x-data-grid-premium';

import './DataTable.style.css';

export default function DataTable({ page, rowCount, pageSize, ...rest }) {
  const [rowCountState, setRowCountState] = React.useState(rowCount || 0);

  React.useEffect(() => {
    setRowCountState((rc) => rowCount || rc || 0);
  }, [rowCount, setRowCountState]);

  return (
    <DataGridPremium
      className="datatable"
      rowHeight={40}
      headerHeight={35}
      pagination
      paginationMode="server"
      page={page}
      pageSize={pageSize}
      rowCount={rowCountState}
      sortingMode="server"
      filterMode="server"
      disableColumnFilter
      disableRowGrouping
      disableColumnSelector
      {...rest}
    />
  );
}
