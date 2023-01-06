import React from 'react';

const widths = {
  small: '150px',
  medium: '200px',
  large: '300px',
};

export default function CompanyLogo(props) {
  return <img src="/images/logo.png" alt="company logo" style={{ width: widths[props.size] }} />;
}
