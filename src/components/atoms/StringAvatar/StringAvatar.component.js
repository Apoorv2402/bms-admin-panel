import { Avatar } from '@mui/material';
import React from 'react';

export default function StringAvatar({ name = '  ', color = '#137ea4' }) {
  const initials = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  return <Avatar sx={{ bgcolor: color }}>{initials}</Avatar>;
}
