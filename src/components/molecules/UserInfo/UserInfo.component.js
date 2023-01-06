import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUser } from 'state/selectors/currentUser.selector';
import StringAvatar from 'components/atoms/StringAvatar/StringAvatar.component';
import UserMenu from './UserMenu.component';

export default function UserInfo() {
  const user = useRecoilValue(currentUser);
  const [userIconEl, setUserIconEl] = useState(null);

  const showUserMenu = Boolean(userIconEl);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography>{user.name}</Typography>
      <IconButton onClick={(e) => setUserIconEl(e.currentTarget)}>
        <StringAvatar name={user.name} />
      </IconButton>
      <UserMenu
        open={showUserMenu}
        anchorEl={userIconEl}
        name={user.name}
        onClose={() => setUserIconEl(null)}
      />
    </Box>
  );
}
