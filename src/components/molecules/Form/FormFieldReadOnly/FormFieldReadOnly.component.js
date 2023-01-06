import { Box, FormHelperText, Typography } from '@mui/material';
import FieldLabel from 'components/atoms/FieldLabel/FieldLabel.component';
import React from 'react';

export default function FormFieldReadOnly({
  name,
  label,
  value,
  type,
  length,
  error,
  helperText,
  required,
  sx = {},
}) {
  let valueStr = value;
  if (type === 'date') {
    valueStr = new Date(value).toDateString();
  } else if (type === 'dateTime') {
    valueStr = new Date(value).toLocaleString();
  }

  return (
    <Box className="display-field" sx={sx}>
      <FieldLabel name={name} label={label} error={error} required={required} />
      <Box
        sx={{
          border: '1px solid silver',
          borderRadius: '5px',
          padding: '5px 10px',
          background: '#e6e6e6',
          maxWidth: `${length * 18 + 30}px`,
          minHeight: '28px',
        }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '3px',
          }}>
          {valueStr}
        </Typography>
      </Box>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </Box>
  );
}
