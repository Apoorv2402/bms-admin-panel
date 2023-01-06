import { Button } from '@mui/material';
import React from 'react';

export default function SubmitButton(props) {
  return (
    <Button type="submit" variant="contained" color="primary" {...props}>
      {props.children}
    </Button>
  );
}
