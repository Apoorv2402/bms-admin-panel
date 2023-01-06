import { Divider, List, Typography } from '@mui/material';
import React from 'react';
import MenuItem from './MenuItem.component';

export default function MenuGroup({ menuGroup = {} }) {
  const items = menuGroup.items || [];
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <List>
        <Typography
          component="div"
          variant="caption"
          align="left"
          sx={{
            color: 'grey',
            textTransform: 'uppercase',
            fontSize: '.6rem',
            ml: 1,
            whiteSpace: 'nowrap',
          }}>
          {menuGroup.label}
        </Typography>
        {items.map((menuItem) => (
          <MenuItem key={menuItem.menuId} menuItem={menuItem} />
        ))}
      </List>
      <Divider sx={{ borderColor: '#c0c0c033' }} />
    </>
  );
}
