import { getMasterDataBaseUrl } from 'common/api/axios.request';

export const glaccounts = {
  title: 'GL Accounts',
  path: `${getMasterDataBaseUrl()}/glaccounts`,
  key: 'glChar',
  columns: [
    {
      field: 'glChar',
      headerName: 'Code',
      width: 150,
    },
    {
      field: 'gldesc',
      headerName: 'Descr',
      width: 300,
      flex: true,
    },
    {
      field: 'gltyp',
      headerName: 'GLType',
      width: 100,
    },
    {
      field: 'glsubtyp',
      headerName: 'GLSubType',
      width: 100,
    },
  ],
};
