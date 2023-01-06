import { Typography } from '@mui/material';
import { msgs } from 'common/constants/messages';
import _ from 'lodash';
import React from 'react';

export default function Msg({ value, lang = 'en' }) {
  if (_.isEmpty(value)) {
    return null;
  }

  if (value.key) {
    return <Typography>{msgs[value] || value.key}</Typography>;
  }

  return <Typography>{msgs[value] || value}</Typography>;
}
