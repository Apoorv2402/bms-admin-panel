import { Button } from '@mui/material';
import React from 'react';
import Loading from '../Loading/Loading.component';

export default function LoadingButton({
  loading,
  variant = 'contained',
  size = 'medium',
  color = 'secondary',
  onClick,
  children,
  ...rest
}) {
  return (
    <Button variant={variant} size={size} color={color} onClick={onClick} {...rest}>
      {children}
      {loading && <Loading size={size === 'large' ? 40 : 25} />}
    </Button>
  );
}
