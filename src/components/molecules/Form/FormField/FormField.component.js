import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormFieldText from '../FormFieldText/FormFieldText.component';
import FormFieldDate from '../FormFieldDate/FormFieldDate.component';
import FormFieldEmail from '../FormFieldEmail/FormFieldEmail.component';
import FormFieldLookup from '../FormFieldLookup/FormFieldLookup.component';
import FormFieldNumber from '../FormFieldNumber/FormFieldNumber.component';
import FormFieldPassword from '../FormFieldPassword/FormFieldPassword.component';
import FormFieldSelect from '../FormFieldSelect/FormFieldSelect.component';
import FormFieldCustom from '../FormFieldCustom/FormFieldCustom.component';

export function FormField({
  name,
  fieldType,
  fieldSize,
  gridSize,
  helperText = '',
  errorText,
  errors,
  fullWidth = true,
  readOnly = false,
  visible = true,
  length,
  actions,
  valueGetter,
  ...rest
}) {
  const [inputStyle, setInputStyle] = useState({
    '& input': { background: '#fff', fontWeight: 'bold' },
  });
  const [errorState, setErrorState] = useState(false);
  const [helperTextState, setHelperTextState] = useState('');

  useEffect(() => {
    if (length) {
      setInputStyle((style) => ({
        ...style,
        maxWidth: `${length * 18 + 30}px`,
      }));
    }
  }, [fieldType, length]);

  useEffect(() => {
    let error = false;
    let text = helperText;
    if (errorText) {
      error = true;
      text = errorText;
    } else if (errors && errors[name]) {
      error = true;
      text = errors[name];
    }
    setErrorState(error);
    setHelperTextState(text);
  }, [name, helperText, errorText, errors]);

  const fieldProps = {
    name,
    fullWidth,
    readOnly,
    visible,
    error: errorState,
    helperText: helperTextState,
    size: fieldSize || 'medium',
    length,
    inputStyle,
    ...rest,
  };

  if (actions && actions.length > 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          width: '100%',
          alignItems: 'flex-start',
        }}>
        <Box sx={{ flex: '1 1' }}>
          <FormFieldText {...fieldProps} />
        </Box>
        <Box sx={{ flex: 0, mt: 2 }}>
          {actions.map((action) => (
            <Button key={action.label} variant="outlined" onClick={action.onClick} size="medium">
              {action.label}
            </Button>
          ))}
        </Box>
      </Box>
    );
  }

  switch (fieldType) {
    case 'email':
      return <FormFieldEmail {...fieldProps} />;
    case 'password':
      return <FormFieldPassword {...fieldProps} />;
    case 'number':
      return <FormFieldNumber {...fieldProps} />;
    case 'date':
      return <FormFieldDate {...fieldProps} />;
    case 'select':
      return <FormFieldSelect {...fieldProps} />;
    case 'lookup':
      return <FormFieldLookup {...fieldProps} />;
    case 'custom':
      return <FormFieldCustom {...fieldProps} />;
    default:
      // all other types fallback to text field
      return <FormFieldText {...fieldProps} />;
  }
}
