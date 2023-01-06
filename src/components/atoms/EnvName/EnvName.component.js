import { Box, Typography } from '@mui/material';
import React from 'react';

const styles = {
  development: {
    background: '#f00',
    color: '#fff',
  },
  qa: {
    background: 'green',
    color: '#000',
  },
  uat: {
    background: 'blue',
    color: '#000',
  },
  'vijay-qa': {
    background: 'green',
    color: '#000',
  },
};

export default function EnvName() {
  const envName = process.env.REACT_APP_ENV;

  if (envName === 'production') {
    return null;
  }

  return (
    <Box
      sx={[
        { flex: 0, alignSelf: 'center', p: '0 10px', borderRadius: '20px', ml: 1 },
        styles[envName],
      ]}>
      <Typography variant="body1">{envName}</Typography>
    </Box>
  );
}
