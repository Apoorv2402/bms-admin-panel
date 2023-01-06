import { CircularProgress } from '@mui/material';
import React from 'react';

const styles = {
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#ffffff9e',
    zIndex: '999',
  },
};

export default function Loading({ text, size = 40 }) {
  return (
    <div style={styles.loading}>
      <CircularProgress size={size} />
      {text && <h4>{text}</h4>}
    </div>
  );
}
