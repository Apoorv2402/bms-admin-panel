import { getMasterDataBaseUrl } from 'common/api/axios.request';

export const isocountrycodes = {
  title: 'ISO Country Codes',
  path: `${getMasterDataBaseUrl()}/isocountrycodes`,
  key: 'isocode',
  columns: [
    {
      field: 'isocode',
      headerName: 'Code',
      width: 150,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      flex: true,
    },
  ],
};
