import { Box, Chip, Paper, Typography } from '@mui/material';
import { getMenuItemIcon } from 'components/molecules/AppMenu/getMenuItemIcon.helper';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentAppMenu } from 'state/atoms/currentAppMenu.atom';
import { userProfileState } from 'state/atoms/userProfileState.atom';
import { useNavigate } from 'react-router-dom';

function HomeFavoriteItem({ favorite = {}, onClick = () => {}, onClickDelete = () => {} }) {
  return (
    <Chip
      label={favorite.label}
      variant="outlined"
      sx={{ fontSize: '1rem', color: '#137ea4', p: 1 }}
      icon={getMenuItemIcon(favorite.menuId)}
      onClick={() => onClick(favorite)}
      onDelete={() => onClickDelete(favorite)}
    />
  );
}

export default function HomeFavorites() {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [appMenu, setAppMenu] = useRecoilState(currentAppMenu);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favorites = [];
    const groups = appMenu.menuItems || [];
    groups.forEach((grp) => {
      if (grp.items) {
        grp.items.forEach((item) => {
          if (_.indexOf(userProfile.favorites, item.menuId) !== -1) {
            favorites.push(item);
          }
        });
      }
    });
    setFavorites(favorites);
  }, [userProfile, appMenu, setFavorites]);

  const handleOpen = (item) => {
    navigate(`/${item.route}`);
    setAppMenu((menu) => ({
      ...menu,
      selected: item.menuId,
    }));
  };

  const handleDelete = (item) => {
    setUserProfile((profile) => ({
      ...profile,
      favorites: profile.favorites.filter((fav) => fav !== item.menuId),
    }));
  };

  return (
    <Paper elevation={5} sx={{ m: '20px', p: 2 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        FAVORITES
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {favorites.map((fav) => (
          <HomeFavoriteItem favorite={fav} onClick={handleOpen} onClickDelete={handleDelete} />
        ))}
      </Box>
    </Paper>
  );
}
