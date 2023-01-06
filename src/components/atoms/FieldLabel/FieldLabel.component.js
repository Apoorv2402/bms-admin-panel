import { Box } from '@mui/system';
import React from 'react';

export default function FieldLabel({ name, label, error, required = false }) {
  return (
    <Box sx={{ display: 'flex', color: error ? '#ff1744' : '#000', fontSize: '0.8rem', mb: '2px' }}>
      <label htmlFor={name}>
        {label}
        {required && <span style={{ color: '#ff1744', fontSize: '1rem' }}>*</span>}
      </label>
    </Box>
  );
}
