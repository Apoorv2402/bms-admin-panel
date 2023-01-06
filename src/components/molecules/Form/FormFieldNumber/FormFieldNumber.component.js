import { Box, TextField } from '@mui/material';
import FieldLabel from 'components/atoms/FieldLabel/FieldLabel.component';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import FormFieldReadOnly from '../FormFieldReadOnly/FormFieldReadOnly.component';

export default function FormFieldNumber({
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
    const v = e.target.value;
    if (_.size(v) > length) {
      return;
    }

    setValueState(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  if (!visible) {
    return null;
  }
  if (readOnly) {
    return <FormFieldReadOnly label={label} value={valueState} length={length} {...rest} />;
  }

  return (
    <Box>
      <FieldLabel label={label} error={error} required={required} />
      <TextField
        type="number"
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
