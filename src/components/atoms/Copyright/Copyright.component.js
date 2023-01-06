import { Typography } from '@mui/material';
import React from 'react';

export default function Copyright(props) {
  return (
    <Typography
      variant={props?.variant || 'caption'}
      align={props?.align || 'center'}
      sx={{ color: '#fff' }}>
      Copyright (c) 2022, Vornado Realty Trust
    </Typography>
  );
}
