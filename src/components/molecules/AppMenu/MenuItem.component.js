import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentAppMenu } from 'state/atoms/currentAppMenu.atom';
import { getMenuItemIcon } from './getMenuItemIcon.helper';
import PushPinIcon from '@mui/icons-material/PushPin';
import { userProfileState } from 'state/atoms/userProfileState.atom';
import _ from 'lodash';

export default function MenuItem({ menuItem = {} }) {
  const [appMenu, setAppMenu] = useRecoilState(currentAppMenu);
  const [, setUserProfile] = useRecoilState(userProfileState);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/${menuItem.route}`, { replace: true });
    setAppMenu((menu) => ({
      ...menu,
      selected: menuItem.menuId,
    }));
  };

  const handleClickPin = (e) => {
    e.preventDefault();
    setUserProfile((profile) => ({
      ...profile,
      favorites: _.concat(profile.favorites, menuItem.menuId),
    }));
  };

  return (
    <ListItem
      className={menuItem.menuId === appMenu.selected ? 'selected' : ''}
      disablePadding
      sx={{ maxHeight: 40 }}>
      <ListItemButton>
        <ListItemIcon onClick={handleClick}>{getMenuItemIcon(menuItem.menuId)}</ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: 'normal',
            letterSpacing: 0,
          }}
          primary={menuItem.label}
          onClick={handleClick}
        />
        <PushPinIcon className="add-fav" onClick={handleClickPin} />
      </ListItemButton>
    </ListItem>
  );
}
