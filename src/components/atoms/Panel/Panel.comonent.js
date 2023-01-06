import { Paper } from '@mui/material';
import React from 'react';

export default function Panel({ elevation = 6, sx = {}, children, ...rest }) {
  return (
    <Paper
      elevation={elevation}
      sx={[{ flex: 0, m: 3, p: 4, maxWidth: 1080, position: 'relative', borderRadius: 2 }, sx]}>
      {children}
    </Paper>
  );
}
