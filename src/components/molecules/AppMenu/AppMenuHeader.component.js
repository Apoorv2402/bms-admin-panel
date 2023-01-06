import { Box, IconButton } from '@mui/material';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import SearchField from 'components/atoms/SearchField/SearchField.component';
import { useRecoilState } from 'recoil';
import { currentAppMenu } from 'state/atoms/currentAppMenu.atom';

export default function AppMenuHeader({ onSearch = () => {}, onClear = () => {} }) {
  const [, setAppMenu] = useRecoilState(currentAppMenu);
  const navigate = useNavigate();

  const handleHome = () => {
    setAppMenu((menu) => ({
      ...menu,
      selected: '',
    }));
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', gap: 0, my: '5px' }}>
      <Box sx={{ flex: 0, ml: 1 }}>
        <IconButton onClick={handleHome}>
          <HomeIcon style={{ color: '#00bcd4' }} />
        </IconButton>
      </Box>
      <Box sx={{ flex: '1 1', ml: '10px' }}>
        <SearchField
          onSearch={onSearch}
          onClear={onClear}
          size="small"
          sx={{
            background: '#6a6e72',
            '& > div': {
              color: '#fff',
            },
          }}
        />
      </Box>
    </Box>
  );
}
