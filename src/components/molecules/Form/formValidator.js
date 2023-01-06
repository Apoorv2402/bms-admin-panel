import _ from 'lodash';
import { emailValidator } from '../../../common/validators/emailValidator';

export function validateForm(fields = [], data = {}) {
  const errors = {};

  fields.forEach((field) => validateFormField(field, data, errors));
  return errors;
}

export function validateFormField(field = { name: '' }, data = {}, errors) {
  const nestedFields = field.fields || [];
  if (!_.isEmpty(nestedFields)) {
    nestedFields.forEach((nestedField) => validateFormField(nestedField, data, errors));
    return;
  }

  // empty name not supported
  if (field.name === '') {
    return;
  }

  const value = _.get(data, field.name);

  // required validation
  if (field.required) {
    const err = 'value is required';
    if (!value) {
      errors[field.name] = err;
      return;
    }

    switch (field.fieldType) {
      case 'number':
        if (value === 0) {
          errors[field.name] = err;
        }
        break;
      case 'boolean':
        if (value !== true) {
          errors[field.name] = err;
        }
        break;
      default:
        if (value === '') {
          errors[field.name] = err;
        }
    }
  }

  // email validator
  if (field.fieldType === 'email') {
    const emailErr = emailValidator(value, data);
    if (emailErr) {
      errors[field.name] = emailErr;
    }
  }

  // custom validators
  if (field.validator) {
    const customErr = field.validator(value, data);
    if (customErr) {
      errors[field.name] = customErr;
    }
  }

  return;
}
