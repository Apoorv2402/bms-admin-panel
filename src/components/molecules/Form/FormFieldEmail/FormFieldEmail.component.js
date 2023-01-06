import { Box, TextField, Typography } from '@mui/material';
import FieldLabel from 'components/atoms/FieldLabel/FieldLabel.component';
import React, { useEffect, useState } from 'react';

export default function FormFieldEmail({
  value,
  label,
  error,
  helperText,
  onChange,
  fullWidth = true,
  visible = true,
  readOnly = false,
  required = false,
  length,
  inputStyle,
  sx,
  ...rest
}) {
  const [valueState, setValueState] = useState('');

  useEffect(() => {
    setValueState(value || '');
  }, [value]);

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
        <Typography variant="body1">{valueState}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <FieldLabel label={label} error={error} required={required} />
      <TextField
        type="email"
        fullWidth={fullWidth}
        value={valueState}
        error={error}
        helperText={helperText}
        inputProps={{
          maxLength: length,
          size: length,
        }}
        onChange={handleChange}
        sx={[inputStyle, sx]}
        {...rest}
      />
    </Box>
  );
}
