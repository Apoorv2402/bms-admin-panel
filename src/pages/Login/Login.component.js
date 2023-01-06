import { Box } from '@mui/material';
import React, { useState } from 'react';

import './Login.style.css';
import LoginHeader from './LoginHeader.component';
import LoginFooter from './LoginFooter.component';
import AppLogo from 'components/atoms/AppLogo/AppLogo.component';
import OktaSignInWidget from './OktaSignInWidget.component';
import { useRecoilState } from 'recoil';
import { userAuthInfo } from 'state/atoms/userAuthInfo.atom';
import Loading from 'components/atoms/Loading/Loading.component';
import EnvSelect from 'components/molecules/EnvSelect/EnvSelect.component';

export default function Login() {
  const [, setUserInfo] = useRecoilState(userAuthInfo);
  const [loading, setLoading] = useState(false);
  const [env, setEnv] = useState('');

  const handleOnSuccess = (tokens) => {
    console.log('handleOnSuccess', tokens);
    setUserInfo(tokens);
  };

  const handleChangeEnv = (env) => {
    setEnv(env);
    setLoading(true);
  };

  return (
    <Box className="login">
      <LoginHeader />
      <Box component="section">
        <Box className="okta-widget">
          {loading && <Loading text={`redirecting to ${env} environment`} />}
          {!loading && (
            <>
              <Box
                sx={{
                  flex: '0 0',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <AppLogo size="medium" />
                <EnvSelect onChange={handleChangeEnv} />
              </Box>
              <Box sx={{ flex: '1 1', width: '100%' }}>
                <OktaSignInWidget onSuccess={handleOnSuccess} />
              </Box>
            </>
          )}
        </Box>
      </Box>
      <LoginFooter />
    </Box>
  );
}
