import { Box, Button, Dialog, Typography } from '@mui/material';
import React from 'react';

export default function AboutModal({ open, onClose = () => {} }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          m: 3,
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant="h4">BMS 2.0</Typography>
        <Typography variant="h6">version 1.0.0 (b001)</Typography>
        <Typography variant="body2">Jan 5, 2023 10:00 AM</Typography>

        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          copyright (c) 2023 <strong>Vornado Reality Trust</strong>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          developed by <a href="https://erplogic.com">https://erplogic.com</a>
        </Typography>
        <Button variant="outlined" onClick={onClose} sx={{ mt: 3 }}>
          Close
        </Button>
      </Box>
    </Dialog>
  );
}
