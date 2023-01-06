import { Box } from '@mui/system';
import React from 'react';

export default function PanelActions({ sx, children, ...rest }) {
  return (
    <Box
      component="header"
      sx={[
        {
          flex: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          py: 1,
          width: '100%',
        },
        sx,
      ]}
      {...rest}>
      {children}
    </Box>
  );
}
