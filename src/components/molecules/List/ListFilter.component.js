import { Badge, Box, Button, IconButton, Paper } from '@mui/material';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import { validateForm } from '../Form/formValidator';
import { Form } from '../Form/Form.component';
import ListFilterCustomModal from './ListFilterCustomModal.component';
import { useRecoilState } from 'recoil';
import { bannerSuccess } from 'state/selectors/banner.selectors';

const submitFieldTypes = ['select'];

export default function ListFilter({
  columns = [],
  fields = [],
  loading = false,
  initialSearches,
  initialFilters,
  onChange = () => {},
  onSubmit = () => {},
  onClear = () => {},
  onCreate = () => {},
}) {
  const [fieldTypes, setFieldTypes] = useState({});
  const [searches, setSearches] = useState({});
  const [filters, setFilters] = useState([]);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [errors, setErrors] = useState({});
  const [, setBannerSuccess] = useRecoilState(bannerSuccess);

  const updateFieldTypes = useCallback(() => {
    const fieldTypes = {};
    const defaultFieldData = {};
    fields.forEach((field) => {
      fieldTypes[field.name] = field.fieldType;
      defaultFieldData[field.name] = field.defaultValue;
    });
    setFieldTypes(fieldTypes);
  }, [fields, setFieldTypes]);

  useEffect(() => {
    updateFieldTypes();
  }, [fields, setFieldTypes, updateFieldTypes]);

  useEffect(() => {
    setSearches(initialSearches);
    setFilters(initialFilters);
  }, [initialSearches, initialFilters]);

  const performSubmit = (searches, filters) => {
    const errors = validateForm(fields, searches);
    if (!_.isEmpty(errors)) {
      setErrors(errors);
      return;
    }

    onSubmit(searches, filters);
  };

  const handleChange = (name, value, error) => {
    const searchesState = {
      ...searches,
      [name]: value,
    };
    setSearches(searchesState);
    setErrors((errors) => ({
      ...errors,
      [name]: error,
    }));
    if (fieldTypes[name] && _.indexOf(submitFieldTypes, fieldTypes[name]) !== -1) {
      performSubmit(searchesState, filters);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performSubmit(searches, filters);
  };

  const handleClear = (e) => {
    e.preventDefault();

    setErrors({});
    setSearches({});
    setFilters([]);
    onClear();
  };

  const handleErrors = (errs) => {
    setErrors(errs);
  };

  const handleFilterModalSubmit = (filters) => {
    setFilters(filters);
    performSubmit(searches, filters);
  };

  const handleProfileSave = () => {
    setBannerSuccess('profile information saved');
  };

  return (
    <Paper
      component="form"
      elevation={0}
      onSubmit={handleSubmit}
      sx={{
        flex: '0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        background: '#e5e5e5',
        width: 'calc(100% -30px)',
        p: 1,
        pt: 2,
        my: 1,
      }}>
      <Box sx={{ width: 768, overflow: 'auto' }}>
        <Form
          fields={fields}
          data={searches}
          fieldSize="small"
          errors={errors}
          onChange={handleChange}
          onErrors={handleErrors}
        />
      </Box>
      <Box
        sx={{
          flex: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onCreate}
            sx={{ mr: 1 }}
            startIcon={<AddIcon />}>
            New
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleSubmit}
            sx={{ mr: 1 }}>
            Search
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleClear}
            sx={{ mr: 1 }}>
            Reset
          </Button>
          <IconButton
            variant="contained"
            size="small"
            color="primary"
            onClick={() => setOpenFilterDialog(true)}>
            <Badge color="error" badgeContent={_.size(filters)}>
              <FilterAltIcon style={{ fontSize: '30px' }} />
            </Badge>
          </IconButton>
          <IconButton
            variant="contained"
            size="small"
            color="primary"
            sx={{ ml: 1 }}
            onClick={handleProfileSave}>
            <PersonAddIcon style={{ fontSize: '30px' }} />
          </IconButton>
        </Box>
      </Box>
      <ListFilterCustomModal
        open={openFilterDialog}
        columns={columns}
        onClose={() => setOpenFilterDialog(false)}
        onSubmit={handleFilterModalSubmit}
      />
    </Paper>
  );
}
