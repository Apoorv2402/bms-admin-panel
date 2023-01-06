import { Box } from '@mui/material';
import FormFieldSelect from 'components/molecules/Form/FormFieldSelect/FormFieldSelect.component';
import React, { useEffect, useState } from 'react';

export default function EnvSelect({ onChange = () => {}, sx = {} }) {
  const [envs, setEnvs] = useState([]);
  const [envUrls, setEnvUrls] = useState({});
  const [value, setValue] = useState('');

  useEffect(() => {
    const envList = (process.env.REACT_APP_ENV_LIST || '').split(',');
    const envs = [];
    const envUrls = {};
    envList.forEach((env) => {
      const [code, value] = env.split('=');
      envs.push({
        code,
        value: code,
      });
      envUrls[code] = value;
    });
    setEnvs(envs);
    setEnvUrls(envUrls);
    setValue(process.env.REACT_APP_ENV);
  }, [setEnvs]);

  const handleOnChange = async (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
    window.location.href = envUrls[e.target.value];
  };

  return (
    <Box
      sx={[
        {
          width: 'calc(100% - 25px)',
          margin: '10px 0 10px 15px',
        },
        sx,
      ]}>
      <FormFieldSelect
        label="Switch To Environment"
        value={value}
        onChange={handleOnChange}
        size="small"
        fullWidth
        options={envs}
      />
    </Box>
  );
}
