import { Box, Grid, Paper, Typography } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { FormField } from './FormField/FormField.component';

function FormFieldRenderer({
  fields,
  data,
  prefix,
  field,
  errors,
  fieldSize = 'medium',
  onChange = () => {},
  onErrors = () => {},
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(field.name, e.target.value);
    }
    if (field.validator && field.validateOnChange) {
      const err = field.validator(e.target.value, data);
      if (err) {
        onErrors({
          ...(errors || {}),
          [field.name]: err,
        });
      }
    }
  };

  if (field.fieldType === 'group') {
    const fields = field.fields || [];
    return (
      <Paper elevation={1} sx={{ mt: 2, p: 2 }}>
        {field.label && (
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            {field.label}
          </Typography>
        )}
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={field.gridSize || 12}>
              <FormFieldRenderer
                fields={fields}
                data={data}
                field={field}
                errors={errors}
                fieldSize={fieldSize}
                prefix={prefix}
                onChange={onChange}
                onErrors={onErrors}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }

  const value = field.valueGetter
    ? field.valueGetter({ row: data })
    : _.get(data, field.name) || '';

  return (
    <FormField
      {...field}
      value={value}
      fieldSize={fieldSize}
      errors={errors}
      onChange={handleChange}
    />
  );
}

export function Form({
  fields = [],
  data = {},
  errors = {},
  fieldSize = 'small',
  onChange = (name, value, error) => {},
  onErrors = (errors) => {},
}) {
  const handleChange = (name, value) => {
    if (onChange) {
      onChange(name, value, undefined);
    }
  };

  const handleErrors = (errors) => {
    if (onErrors) {
      onErrors(errors);
    }
  };

  return (
    <Box sx={{ mb: 2, width: '100%' }}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid key={field.name} item xs={field.gridSize || 12}>
            <FormFieldRenderer
              fields={fields}
              data={data}
              prefix={field.name}
              field={field}
              errors={errors}
              fieldSize={fieldSize}
              onChange={handleChange}
              onErrors={handleErrors}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
