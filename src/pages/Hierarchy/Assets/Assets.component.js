import { getMasterDataBaseUrl } from 'common/api/axios.request';
import List from 'components/molecules/List/List.component';
import Page from 'components/molecules/Page/Page.component';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { assets } from 'state/atoms/assets.atom';

function __getListColumns() {
  const columns = [
    {
      field: 'assetid',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'assetname',
      headerName: 'Name',
      width: 300,
    },
    {
      field: 'addrUid',
      headerName: 'Address',
      width: 200,
      flex: true,
      valueGetter: ({ row }) => _.get(row, 'address.addrline1'),
    },
    {
      field: 'assetComment',
      headerName: 'Alternate Name',
      width: 150,
    },
    {
      field: 'assetType',
      headerName: 'Type',
      width: 150,
    },
    {
      field: 'ownershipType',
      headerName: 'Ownership',
      width: 100,
    },
    {
      field: 'commencementDate',
      headerName: 'Established Date',
      width: 150,
    },
    {
      field: 'inactive',
      headerName: 'Status',
      width: 100,
      valueGetter: ({ row }) => (row.inactive ? 'Inctive' : 'Active'),
    },
  ];

  return columns;
}

function __getFilterFields() {
  const fields = [
    {
      name: 'search',
      fieldType: 'text',
      label: 'Search Any',
      gridSize: 3,
    },
    {
      name: 'inactive',
      fieldType: 'select',
      label: 'Status',
      gridSize: 2,
      defaultValue: '*',
      options: [
        {
          code: '*',
          value: 'All',
        },
        {
          code: 'false',
          value: 'Active',
        },
        {
          code: 'true',
          value: 'Inactive',
        },
      ],
    },
    {
      name: 'assetid',
      fieldType: 'text',
      label: 'ID',
      gridSize: 2,
    },
    {
      name: 'assetType',
      fieldType: 'select',
      label: 'AssetType',
      gridSize: 2,
      defaultValue: '*',
      options: [
        {
          code: '*',
          value: 'All',
        },
        {
          code: 'B',
          value: 'Building',
        },
        {
          code: 'A',
          value: 'Admin',
        },
        {
          code: '1',
          value: 'One Off',
        },
        {
          code: 'C',
          value: 'Carpet',
        },
      ],
    },
    {
      name: 'ownershipType',
      fieldType: 'select',
      label: 'Ownership',
      gridSize: 3,
      length: 10,
      defaultValue: '*',
      options: [
        {
          code: '*',
          value: 'All',
        },
        {
          code: 'W',
          value: 'Wholly Owned',
        },
        {
          code: '3',
          value: 'Third Party',
        },
      ],
    },
  ];

  return fields;
}

function __getBreadcrumbItems() {
  return [
    {
      id: 'list',
      label: 'List',
      route: '/assets',
    },
  ];
}

export default function SuperDivisions() {
  const [columns, setColumns] = useState([]);
  const [filterFields, setFilterFields] = useState([]);

  useEffect(() => {
    setColumns(__getListColumns());
    setFilterFields(__getFilterFields());
  }, []);

  return (
    <Page title="Assets" breadcrumbs={__getBreadcrumbItems()}>
      <List
        route="/assets"
        apiPath={`${getMasterDataBaseUrl()}/assets`}
        columns={columns}
        state={assets}
        filterFields={filterFields}
      />
    </Page>
  );
}
