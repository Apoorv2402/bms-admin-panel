import { Divider, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';

import './AppMenu.style.css';
import { useRecoilValue } from 'recoil';
import { currentAppMenu } from 'state/atoms/currentAppMenu.atom';
import AppMenuHeader from './AppMenuHeader.component';
import AppMenuItems from './AppMenuItems.component';

export default function AppMenu() {
  const appMenu = useRecoilValue(currentAppMenu);
  const [searchText, setSearchText] = useState('');
  const [classes, setClasses] = useState('');

  useEffect(() => {
    setClasses(appMenu.collapsed ? 'collapsed' : 'expanded');
  }, [appMenu]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const handleClear = () => {
    setSearchText('');
  };

  const handleMouseEnter = () => {
    if (appMenu.collapsed) {
      setClasses('expanded open');
    }
  };

  const handleMouseLeave = () => {
    if (appMenu.collapsed) {
      setClasses('collapsed');
    }
  };

  return (
    <Drawer
      className={`menu ${classes}`}
      anchor="left"
      variant="permanent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <section>
        <AppMenuHeader
          collapsed={appMenu.collapsed}
          onSearch={handleSearch}
          onClear={handleClear}
        />
        <Divider sx={{ borderColor: '#c0c0c033' }} />
        <AppMenuItems searchText={searchText} />
      </section>
    </Drawer>
  );
}
