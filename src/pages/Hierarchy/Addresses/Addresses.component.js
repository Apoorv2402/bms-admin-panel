import { getMasterDataBaseUrl } from 'common/api/axios.request';
import List from 'components/molecules/List/List.component';
import Page from 'components/molecules/Page/Page.component';
import React, { useEffect, useState } from 'react';
import { addresses } from 'state/atoms/addresses.atom';

const __getListColumns = () => {
  const columns = [
    {
      field: 'addrUid',
      headerName: 'AddressID',
      width: 100,
    },
    {
      field: 'versionno',
      headerName: 'Version',
      width: 100,
    },
    {
      field: 'addrline1',
      headerName: 'AddressLine1',
      width: 200,
    },
    {
      field: 'addrline2',
      headerName: 'AddressLine2',
      width: 200,
      flex: true,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 200,
    },
    {
      field: 'regioncode',
      headerName: 'State',
      width: 50,
    },
    {
      field: 'countrycode',
      headerName: 'Country',
      width: 70,
    },
    {
      field: 'postalcode',
      headerName: 'PostalCode',
      width: 100,
    },
    {
      field: 'addressType',
      headerName: 'AddressType',
      width: 100,
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
      required: false,
      gridSize: 4,
    },
  ];

  return fields;
};

function __getBreadcrumbItems() {
  return [
    {
      id: 'list',
      label: 'List',
      route: '/addresses',
    },
  ];
}

export default function Addresses() {
  const [columns, setColumns] = useState([]);
  const [filterFields, setFilterFields] = useState([]);

  useEffect(() => {
    setColumns(__getListColumns());
    setFilterFields(__getFilterFields());
  }, []);

  return (
    <Page title="Addresses" breadcrumbs={__getBreadcrumbItems()}>
      <List
        route="/addresses"
        apiPath={`${getMasterDataBaseUrl()}/addresses`}
        columns={columns}
        state={addresses}
        filterFields={filterFields}
      />
    </Page>
  );
}
