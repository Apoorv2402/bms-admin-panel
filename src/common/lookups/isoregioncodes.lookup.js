import { getMasterDataBaseUrl } from 'common/api/axios.request';

export const isoregioncodes = {
  title: 'ISO State Codes',
  path: `${getMasterDataBaseUrl()}/isoregioncodes`,
  key: 'regioncode',
  columns: [
    {
      field: 'regioncode',
      headerName: 'Code',
      width: 150,
    },
    {
      field: 'isocode',
      headerName: 'Country',
      width: 100,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      flex: true,
    },
  ],
};
