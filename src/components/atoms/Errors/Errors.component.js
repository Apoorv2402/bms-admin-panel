import { Alert, Box } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import Msg from 'components/atoms/Msg/Msg.component';

export default function Errors({ errors, key = '*', variant = 'filled' }) {
  if (_.isEmpty(errors)) {
    return null;
  }

  const value = errors[key] || errors;
  return (
    <Box sx={{ my: '10px' }}>
      <Alert variant={variant} severity="error">
        <Msg value={value} />
      </Alert>
    </Box>
  );
}
