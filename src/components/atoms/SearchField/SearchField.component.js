import React, { useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchField({
  className,
  placeholder = 'Search',
  onSearch,
  searchIcon = false,
  onClear,
  size = 'medium',
  sx = {},
}) {
  const [value, setValue] = useState('');

  const handleSearch = (e) => {
    setValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setValue('');
    if (onClear) {
      onClear();
    }
  };

  const sxPaper = {
    margin: '5px 10px',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    height: 40,
  };
  const sxInput = { marginLeft: 1, flex: 1 };
  const styleIcon = {};
  if (size === 'small') {
    sxPaper.height = 30;
    sxInput.fontSize = '.8rem';
    styleIcon.fontSize = '1rem';
  }

  return (
    <div className={className}>
      <Paper component="form" sx={[sxPaper, sx]}>
        <InputBase
          placeholder={placeholder}
          inputProps={{ 'aria-label': placeholder }}
          value={value}
          onChange={handleSearch}
          size="small"
          sx={sxInput}
        />
        {searchIcon && (
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        )}
        {onClear && (
          <IconButton aria-label="search" onClick={handleClear}>
            <ClearIcon style={styleIcon} />
          </IconButton>
        )}
      </Paper>
    </div>
  );
}
