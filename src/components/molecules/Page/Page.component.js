import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import AppMenu from 'components/molecules/AppMenu/AppMenu.component';
import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import './Page.style.css';
import PageBreadcrumbs from './PageBreadcrumbs.component';
import { PageFooter } from './PageFooter.component';
import { PageHeader } from './PageHeader.component';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentAppMenu } from 'state/atoms/currentAppMenu.atom';

export default function Page({ title, breadcrumbs, children }) {
  const appMenu = useRecoilValue(currentAppMenu);

  const contentsClasses = appMenu.collapsed ? 'contents collapsed' : 'contents';

  return (
    <div className="page">
      <PageHeader title={title} />
      <section>
        <AppMenu />
        <div className={contentsClasses}>
          <Box
            sx={{
              flex: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mx: '15px',
              mt: '2px',
            }}>
            <PageBreadcrumbs items={breadcrumbs} />
            {title && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" align="right" sx={{ fontWeight: 'bold', m: 0 }}>
                  {title}
                </Typography>
                <Link target="_blank">
                  <OpenInNewIcon style={{ color: '#137ea4' }} />
                </Link>
              </Box>
            )}
          </Box>
          <Box sx={{ flex: '1 1', width: '100%', height: '100%', overflow: 'auto' }}>
            {children}
          </Box>
        </div>
      </section>
      <PageFooter />
    </div>
  );
}
