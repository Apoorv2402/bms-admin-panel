import { Box } from '@mui/system';
import { axiosRequest } from 'common/api/axios.request';
import { extractGlobalError } from 'common/errors/errors.helper';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { bannerError } from 'state/selectors/banner.selectors';

import './List.style.css';
import ListDataTable from './ListDataTable.component';
import ListFilter from './ListFilter.component';

export default function List({
  route,
  apiPath,
  columns = [],
  filterFields = [],
  state,
  sx,
  sxTable,
  onSelectedRow = (row, index) => {},
  onClickCreate = () => {},
  onClickEdit = (row, index) => {},
  onClickDelete = (row, index) => {},
}) {
  const [data, setData] = useRecoilState(state);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [, setBannerError] = useRecoilState(bannerError);

  const getListData = useCallback(async () => {
    try {
      setLoading(true);

      const page = data.page || 0;
      const pageSize = data.pageSize || 25;
      const sortBy = data.sortBy || '';
      const searches = data.searches || {};
      const filters = data.filters || [];

      const searchesArr =
        Object.keys(searches)
          .filter((key) => searches[key])
          .map((key) => ({ column: key, operator: 'eq', value: searches[key] })) || [];
      const allFilters = _.concat(searchesArr, filters);

      const resp =
        allFilters.length > 0
          ? await axiosRequest().post(
              `${apiPath}/search?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`,
              allFilters
            )
          : await axiosRequest().get(
              `${apiPath}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`
            );

      const rows = _.get(resp, 'data.data') || [];
      const pagination = _.get(resp, 'data.meta.pagination') || {};
      setData((data) => ({
        ...data,
        rows,
        pagination,
      }));
    } catch (e) {
      console.log(e);
      setBannerError(extractGlobalError(e));
    } finally {
      setLoading(false);
    }
  }, [
    apiPath,
    setData,
    data.page,
    data.pageSize,
    data.sortBy,
    data.searches,
    data.filters,
    setBannerError,
  ]);

  useEffect(() => {
    getListData();
  }, [
    apiPath,
    getListData,
    setData,
    data.page,
    data.pageSize,
    data.sortBy,
    data.searches,
    data.filters,
  ]);

  const handlePage = (page) => {
    setLoading(true);
    setData((data) => ({
      ...data,
      page,
    }));
  };

  const handlePageSize = (pageSize) => {
    setLoading(true);
    setData((data) => ({
      ...data,
      pageSize,
    }));
  };

  const handleSortBy = (sortBy) => {
    setLoading(true);
    setData((data) => ({
      ...data,
      sortBy,
    }));
  };

  const handleSearch = (searches, filters) => {
    setLoading(true);
    setData((data) => ({
      ...data,
      searches,
      filters,
    }));
  };

  const handleClear = () => {
    setLoading(true);
    setData((data) => ({
      ...data,
      page: 0,
      pageSize: 25,
      searches: {},
      filters: {},
    }));
  };

  const handleClickCreate = () => {
    navigate(`${route}/new`);
  };

  const handleClickEdit = (row) => {
    navigate(`${route}/${row.id}`);
  };

  const handleClickDelete = () => {};

  return (
    <Box
      className="list"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 20px)',
        height: 'calc(100% - 20px)',
        m: '10px',
      }}>
      <ListFilter
        fields={filterFields}
        columns={columns}
        loading={loading}
        initialSearches={data.searches}
        initialFilters={data.filters}
        onSubmit={handleSearch}
        onClear={handleClear}
        onCreate={handleClickCreate}
      />
      <ListDataTable
        rows={data.rows}
        columns={columns}
        rowCount={_.get(data, 'pagination.rowCount') || 0}
        page={data.page}
        pageSize={data.pageSize}
        sortBy={data.sortBy}
        loading={loading}
        sx={sxTable}
        filters={data.filters}
        onPageChange={handlePage}
        onPageSizeChange={handlePageSize}
        onSortChange={handleSortBy}
        onRowDoubleClick={handleClickEdit}
        onRowDelete={handleClickDelete}
      />
    </Box>
  );
}
