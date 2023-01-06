import { Box, Typography } from '@mui/material';
import AppLogo from 'components/atoms/AppLogo/AppLogo.component';
import CompanyLogo from 'components/atoms/CompanyLogo/CompanyLogo.component';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useRecoilState } from 'recoil';
import { currentAppMenu } from 'state/atoms/currentAppMenu.atom';
import AboutModal from './About.component';
import UserInfo from '../UserInfo/UserInfo.component';
import EnvName from 'components/atoms/EnvName/EnvName.component';

export function PageHeader() {
  const [appMenu, setAppMenu] = useRecoilState(currentAppMenu);
  const [openAbout, setOpenAbout] = useState(false);

  const handleToggleAppMenu = () => {
    setAppMenu((state) => ({
      ...state,
      collapsed: !state.collapsed,
    }));
  };

  return (
    <header className="page">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {appMenu.collapsed && (
          <MenuIcon
            sx={{ mr: 1, fontSize: '2rem', color: '#137ea4' }}
            onClick={handleToggleAppMenu}
          />
        )}
        {!appMenu.collapsed && (
          <KeyboardDoubleArrowLeftIcon
            sx={{ mr: 1, fontSize: '2rem', color: '#137ea4' }}
            onClick={handleToggleAppMenu}
          />
        )}
        <Typography variant="subtitle1">
          <AppLogo size="small" color="white" onClick={() => setOpenAbout(true)} />
        </Typography>
        <EnvName />
      </Box>
      <Box sx={{ m: '10px' }}>
        <CompanyLogo size="small" />
      </Box>
      <Box>
        <UserInfo />
      </Box>
      <AboutModal open={openAbout} onClose={() => setOpenAbout(false)} />
    </header>
  );
}
