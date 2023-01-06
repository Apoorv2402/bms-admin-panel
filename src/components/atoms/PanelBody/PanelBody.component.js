import { Box } from '@mui/material';
import React from 'react';

export default function PanelBody({ sx, children, ...rest }) {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          mb: 5,
        },
        sx,
      ]}
      {...rest}>
      {children}
    </Box>
  );
}
