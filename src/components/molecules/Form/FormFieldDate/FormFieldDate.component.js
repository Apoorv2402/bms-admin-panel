import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import FormFieldReadOnly from '../FormFieldReadOnly/FormFieldReadOnly.component';
import FieldLabel from 'components/atoms/FieldLabel/FieldLabel.component';

export const toMDY = (d, defaultValue) => {
  if (d === undefined || d === null || d === '') {
    if (defaultValue === 'today') {
      d = new Date();
    } else {
      return defaultValue;
    }
  }

  const dt = new Date(d);
  let month = dt.getMonth() < 10 ? `0${dt.getMonth()}` : `${dt.getMonth()}`;
  let date = dt.getDate() < 10 ? `0${dt.getDate()}` : `${dt.getDate()}`;

  return `${month}/${date}/${dt.getFullYear()}`;
};

export default function FormFieldDate({
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
  const [valueState, setValueState] = useState(dayjs(value));

  useEffect(() => {
    setValueState(value || '');
  }, [value]);

  const handleChange = (newValue) => {
    const dv = dayjs(newValue).format('YYYY-MM-DD');
    setValueState(dv);
    if (onChange) {
      onChange({ target: { value: dv } });
    }
  };

  if (!visible) {
    return null;
  }
  if (readOnly) {
    return <FormFieldReadOnly label={label} value={toMDY(valueState, '')} />;
  }

  return (
    <Box>
      <FieldLabel label={label} error={error} required={required} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          inputFormat="MM/DD/YYYY"
          value={valueState}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              size={size}
              error={error}
              helperText={helperText}
              sx={[inputStyle, { width: '150px' }, sx]}
              {...rest}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
