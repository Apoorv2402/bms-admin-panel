import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import FormFieldReadOnly from '../FormFieldReadOnly/FormFieldReadOnly.component';
import FieldLabel from 'components/atoms/FieldLabel/FieldLabel.component';
import FormFieldLookupModal from './FormFieldLookupModal.component';

export default function FormFieldLookup({
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
  lookup,
  sx,
  ...rest
}) {
  const [valueState, setValueState] = useState('');
  const [openLookupModal, setOpenLookupModal] = useState(false);

  useEffect(() => {
    setValueState(value || '');
  }, [value]);

  const handleChange = (e) => {
    setValueState(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleLookupSelect = (value) => {
    setValueState(value);
    if (onChange) {
      onChange({ target: { value } });
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
      <FieldLabel label={label} error={error} required={required} />
      <FormControl
        fullWidth={fullWidth}
        variant="outlined"
        error={error}
        sx={[inputStyle, { maxWidth: `${length * 18 + 50}px` }, sx]}>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          value={valueState}
          size={size}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="open lookup"
                onClick={() => setOpenLookupModal(true)}
                edge="end">
                <SpeakerNotesIcon style={{ color: '137ea4' }} />
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
      {openLookupModal && (
        <FormFieldLookupModal
          lookup={lookup}
          open={openLookupModal}
          onClose={() => setOpenLookupModal(false)}
          onSelect={handleLookupSelect}
        />
      )}
    </Box>
  );
}
