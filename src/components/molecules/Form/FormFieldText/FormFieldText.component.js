import { Box, TextField } from '@mui/material';
import FieldLabel from 'components/atoms/FieldLabel/FieldLabel.component';
import React, { useEffect, useState } from 'react';
import FormFieldReadOnly from '../FormFieldReadOnly/FormFieldReadOnly.component';

export default function FormFieldText({
  name,
  value,
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
  const [valueState, setValueState] = useState(value);

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
      <FormFieldReadOnly
        name={name}
        label={label}
        value={valueState}
        length={length}
        error={error}
        helperText={helperText}
        {...rest}
      />
    );
  }

  return (
    <Box>
      <FieldLabel name={name} label={label} error={error} required={required} />
      <TextField
        id={name}
        type="text"
        fullWidth={fullWidth}
        value={valueState}
        error={error}
        helperText={helperText}
        size={size}
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
