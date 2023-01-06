import { Box } from '@mui/material';
import FieldLabel from 'components/atoms/FieldLabel/FieldLabel.component';
import React from 'react';

export default function FormFieldCustom({ name, label, error, component, required, ...rest }) {
  return (
    <Box>
      <FieldLabel name={name} label={label} error={error} required={required} />
      {() => component(error, required, ...rest)}
    </Box>
  );
}
