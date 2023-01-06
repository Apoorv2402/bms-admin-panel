import React from 'react';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppsIcon from '@mui/icons-material/Apps';
import StopIcon from '@mui/icons-material/Stop';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TableViewIcon from '@mui/icons-material/TableView';

export function getMenuItemIcon(menuId, color) {
  switch (menuId) {
    case 'superdivisions':
      return <StopIcon />;
    case 'divisions':
      return <DashboardIcon />;
    case 'subdivisions':
      return <AppsIcon />;
    case 'assets':
      return <CorporateFareIcon />;
    case 'groups':
      return <DynamicFeedIcon />;
    case 'views':
      return <VisibilityIcon />;
    case 'addresses':
      return <LocationOnIcon />;
    case 'glaccounts':
      return <AccountBalanceWalletIcon />;
    case 'glentry':
      return <LocalAtmIcon />;
    case 'glinquiry':
      return <PriceChangeIcon />;
    case 'glrecurringje':
      return <EventRepeatIcon />;
    case 'usermanagement':
      return <PersonIcon />;
    case 'usergroups':
      return <PeopleAltIcon />;
    case 'gtm':
      return <TableViewIcon />;
    default:
      return <AccountTreeIcon />;
  }
}
