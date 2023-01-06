import { Box } from '@mui/material';
import React from 'react';

export default function AppLogo({
  size = 'medium',
  align = 'center',
  color = 'black',
  sx = {},
  onClick = () => {},
}) {
  const width = size === 'large' ? 200 : size === 'small' ? 100 : 150;

  return (
    <Box style={{ textAlign: align }} sx={sx}>
      <img
        style={{ width }}
        src={color === 'white' ? '/images/bms-white.png' : '/images/bms-blue.jpg'}
        alt="app logo"
        onClick={onClick}
      />
    </Box>
  );
}
