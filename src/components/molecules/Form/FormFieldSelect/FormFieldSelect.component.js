import { FormControl, FormHelperText, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FieldLabel from 'components/atoms/FieldLabel/FieldLabel.component';
import React, { useEffect, useState } from 'react';

export default function FormFieldSelect({
  name,
  value,
  label,
  fullWidth = true,
  error,
  helperText,
  size,
  onChange,
  onBlur,
  visible = true,
  readOnly = false,
  required = false,
  options = [],
  gridSize,
  length,
  inputStyle,
  sx,
  ...rest
}) {
  const [valueState, setValueState] = useState(value);

  useEffect(() => {
    setValueState(value);
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
    return <Typography variant="body1">{valueState}</Typography>;
  }

  return (
    <Box>
      <FieldLabel label={label} error={error} required={required} />
      <FormControl variant="outlined" fullWidth error={error} size={size}>
        <Select
          id={`id__${name}`}
          fullWidth
          value={valueState}
          onChange={handleChange}
          sx={[{ background: '#fff', fontWeight: 'bold' }, inputStyle, sx]}
          {...rest}>
          {options.map((o) => (
            <MenuItem key={o.code} value={o.code}>
              {o.value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
}
