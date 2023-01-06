import React from 'react';
import MuiAlert from '@mui/material/Alert';
import { useRecoilState } from 'recoil';
import { currentBanner } from 'state/atoms/currentBanner.atom';
import { Snackbar } from '@mui/material';
import Msg from '../Msg/Msg.component';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MsgBanner() {
  const [banner, setBanner] = useRecoilState(currentBanner);

  const handleClose = () => {
    setBanner((info) => ({
      ...info,
      show: false,
      severity: 'info',
      msg: '',
    }));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={banner.show}
      onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={banner.severity}
        sx={{ mt: '60px', ...banner.sx, width: '100%' }}>
        <Msg value={banner.msg} />
      </Alert>
    </Snackbar>
  );
}
