import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import FieldLabel from 'components/atoms/FieldLabel/FieldLabel.component';
import React, { useEffect, useState } from 'react';

export default function FormFieldPassword({
  value,
  defaultValue,
  label,
  fullWidth,
  error,
  helperText,
  size,
  onChange,
  onBlur,
  visible = true,
  readOnly = false,
  required = false,
  length,
  inputStyle,
  sx,
  ...rest
}) {
  const [valueState, setValueState] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    setValueState(value || defaultValue || '');
  }, [value, defaultValue]);

  const handleChange = (e) => {
    setValueState(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  if (!visible) {
    return null;
  }
  if (readOnly) {
    return (
      <Box>
        <Typography variant="caption">{label}</Typography>
        <Typography variant="body1">***</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <FieldLabel label={label} error={error} required={required} />
      <FormControl
        fullWidth={fullWidth}
        variant="outlined"
        error={error}
        size="small"
        sx={[{ '& input': { background: '#fff' } }, sx]}
        {...rest}>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPwd ? 'text' : 'password'}
          value={valueState}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPwd(true)}
                onMouseDown={() => setShowPwd(false)}
                edge="end">
                {showPwd ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
}
