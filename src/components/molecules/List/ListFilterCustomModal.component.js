import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import { Box } from '@mui/system';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import FormFieldSelect from '../Form/FormFieldSelect/FormFieldSelect.component';
import FormFieldText from '../Form/FormFieldText/FormFieldText.component';

const operators = [
  { code: 'eq', value: 'Equals' },
  { code: 'ne', value: 'Not equals' },
  { code: 'starts', value: 'Starts with' },
  { code: 'ends', value: 'Ends with' },
  { code: 'like', value: 'Contains' },
  { code: 'gt', value: 'Greater than' },
  { code: 'lt', value: 'Less than' },
  { code: 'ge', value: 'Greater than or equal' },
  { code: 'le', value: 'Less than or equal' },
];

export default function ListFilterCustomModal({
  columns = [],
  open,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [filters, setFilters] = useState([]);
  const [filterColumns, setFilterColumns] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const filterColumns = columns.map((ff) => ({ code: ff.field, value: ff.headerName })) || [];
    setFilterColumns(filterColumns);
    if (filterColumns.length > 0) {
      setFilters([
        {
          column: filterColumns[0].code,
          operator: 'starts',
          value: '',
        },
      ]);
    }
  }, [columns]);

  const handleChange = (i, key, value) => {
    setFilters((filters) =>
      Object.assign([], filters, {
        [i]: {
          ...filters[i],
          [key]: value,
        },
      })
    );
    setErrors((errors) =>
      Object.assign([], errors, {
        [i]: {
          ...errors[i],
          [key]: undefined,
        },
      })
    );
  };

  const handleAdd = () => {
    setFilters((filters) =>
      _.concat(filters, {
        column: '',
        operator: 'eq',
        value: '',
      })
    );
  };

  const handleClear = () => {
    setFilters([]);
    setErrors([]);
  };

  const handleRemove = (i) => {
    setFilters((filters) => filters.filter((a, ai) => ai !== i));
  };

  const handleSubmit = () => {
    const errors = [];
    let hasErrors = false;
    filters.forEach((filter, i) => {
      const ferrors = {};
      if (_.isEmpty(_.get(filter, 'column'))) {
        ferrors[`column`] = 'column is required';
        hasErrors = true;
      }
      if (_.isEmpty(_.get(filter, 'operator'))) {
        ferrors[`opr`] = 'operator is required';
        hasErrors = true;
      }
      if (_.isEmpty(_.get(filter, 'value'))) {
        ferrors[`value`] = 'value is required';
        hasErrors = true;
      }
      errors.push(ferrors);
    });
    if (hasErrors) {
      setErrors(errors);
      return;
    }

    onSubmit(filters);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Filters</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', height: '200px', pt: '10px', overflow: 'auto' }}>
          {filters.map((filter, i) => (
            <Grid container key={`filter_${i}`} spacing={1} sx={{ width: '100%' }}>
              <Grid item xs={4}>
                <FormFieldSelect
                  name={`column_${i}`}
                  label="Column"
                  size="small"
                  value={filter.column}
                  options={filterColumns}
                  helperText={_.get(errors, `${i}.column`)}
                  onChange={(e) => handleChange(i, `column`, e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <FormFieldSelect
                  name={`operator_${i}`}
                  label="Operator"
                  size="small"
                  value={filter.operator}
                  options={operators}
                  helperText={_.get(errors, `${i}.operator`)}
                  onChange={(e) => handleChange(i, `operator`, e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormFieldText
                    name={`value_${i}`}
                    label="Value"
                    size="small"
                    value={filter.value}
                    error={!_.isEmpty(_.get(errors, `${i}.value`))}
                    helperText={_.get(errors, `${i}.value`)}
                    onChange={(e) => handleChange(i, `value`, e.target.value)}
                  />
                  <IconButton onClick={() => handleRemove(i)}>
                    <ClearIcon color="danger" />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: '10px', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button variant="outlined" size="medium" color="primary" onClick={handleAdd}>
            Add
          </Button>
          <Button variant="outlined" size="medium" color="primary" onClick={handleClear}>
            Clear
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button variant="outlined" size="medium" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" size="medium" onClick={handleSubmit} autoFocus>
            OK
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
