import { getMasterDataBaseUrl } from 'common/api/axios.request';
import List from 'components/molecules/List/List.component';
import Page from 'components/molecules/Page/Page.component';
import React, { useEffect, useState } from 'react';
import { superDivisions } from 'state/atoms/superDivisions.atom';

function __getListColumns() {
  const columns = [
    {
      field: 'superdivcd',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'superdivName',
      headerName: 'Name',
      width: 300,
    },
    {
      field: 'superdivAlias',
      headerName: 'Alias',
      width: 200,
      flex: true,
    },
    {
      field: 'superdivDbanam',
      headerName: 'DBA Name',
      width: 150,
    },
    {
      field: 'corpId',
      headerName: 'Corporate ID',
      width: 150,
    },
    {
      field: 'registeredDate',
      headerName: 'Registered Date',
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
      name: 'superdivcd',
      fieldType: 'text',
      label: 'ID',
      gridSize: 2,
    },
  ];

  return fields;
}

function __getBreadcrumbItems() {
  return [
    {
      id: 'list',
      label: 'List',
      route: '/superdivisions',
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
    <Page title="Super Divisions" breadcrumbs={__getBreadcrumbItems()}>
      <List
        route="/superdivisions"
        apiPath={`${getMasterDataBaseUrl()}/superdivisions`}
        columns={columns}
        state={superDivisions}
        filterFields={filterFields}
      />
    </Page>
  );
}
