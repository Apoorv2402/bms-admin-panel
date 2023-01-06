import theme from 'theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import React, { useCallback, useEffect } from 'react';
import { RoutesHolder } from 'routes/RoutesHolder.component';
import { LicenseInfo } from '@mui/x-license-pro';
import { currentAppMenu } from 'state/atoms/currentAppMenu.atom';
import { axiosRequest, getAuthBaseUrl } from 'common/api/axios.request';
import MsgBanner from 'components/atoms/MsgBanner/MsgBanner.component';
import { useRecoilState } from 'recoil';

LicenseInfo.setLicenseKey(
  'ad38efa970bd48cede8ee0a410a3e77fTz01NTM3NyxFPTE3MDE0Nzk4NDE0OTQsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y'
);

export function AppProvider() {
  const [, setAppMenu] = useRecoilState(currentAppMenu);

  const getMenuItems = useCallback(async () => {
    try {
      const menuItems = await axiosRequest().get(`${getAuthBaseUrl()}/menu`);
      setAppMenu((menu) => ({
        ...menu,
        menuItems: menuItems.data.data || [],
        selectedMenuItem: -1,
      }));
    } catch (e) {
      console.log(e);
    }
  }, [setAppMenu]);

  useEffect(() => {
    getMenuItems();
  }, [getMenuItems]);

  return (
    <ThemeProvider theme={theme}>
      <RoutesHolder />
      <MsgBanner />
    </ThemeProvider>
  );
}
