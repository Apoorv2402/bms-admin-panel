import { getMasterDataBaseUrl } from 'common/api/axios.request';
import List from 'components/molecules/List/List.component';
import Page from 'components/molecules/Page/Page.component';
import React, { useEffect, useState } from 'react';
import { divisions } from 'state/atoms/divisions.atom';

const __getListColumns = () => {
  const columns = [
    {
      field: 'divcd',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'divname',
      headerName: 'Name',
      width: 300,
      flex: true,
    },
    {
      field: 'asset',
      headerName: 'Asset',
      width: 200,
    },
    {
      field: 'superdivcd',
      headerName: 'SuperDivision',
      width: 150,
    },
    {
      field: 'inactive',
      headerName: 'Active',
      width: 150,
    },
  ];

  return columns;
};

const __getFilterFields = () => {
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
      name: 'divcd',
      fieldType: 'text',
      label: 'ID',
      gridSize: 2,
    },
  ];

  return fields;
};

function __getBreadcrumbItems() {
  return [
    {
      id: 'list',
      label: 'List',
      route: '/divisions',
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
    <Page title="Divisions" breadcrumbs={__getBreadcrumbItems()}>
      <List
        route="/divisions"
        apiPath={`${getMasterDataBaseUrl()}/divisions`}
        columns={columns}
        state={divisions}
        filterFields={filterFields}
      />
    </Page>
  );
}
