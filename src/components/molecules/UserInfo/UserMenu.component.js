import { Divider, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import StringAvatar from 'components/atoms/StringAvatar/StringAvatar.component';
import EnvSelect from '../EnvSelect/EnvSelect.component';

export default function UserMenu({ anchorEl, open, name, onClose }) {
  const { oktaAuth } = useOktaAuth();

  const handleLogout = async () => {
    await oktaAuth.signOut();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="user-menu"
      open={open}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          minWidth: '200px',
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      <MenuItem>
        <ListItemIcon>
          <StringAvatar name={name} fontSize="small" />
        </ListItemIcon>
        <Typography>User Profile</Typography>
      </MenuItem>
      <Divider />
      <MenuItem>
        <EnvSelect />
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon style={{ color: '#137ea4' }} />
        </ListItemIcon>
        <Typography>Logout</Typography>
      </MenuItem>
    </Menu>
  );
}
