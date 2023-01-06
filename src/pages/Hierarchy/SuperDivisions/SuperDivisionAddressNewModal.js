import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { Form } from 'components/molecules/Form/Form.component';
import { axiosRequest, getMasterDataBaseUrl } from 'common/api/axios.request';
import _ from 'lodash';
import { extractErrors } from 'common/errors/errors.helper';
import LoadingButton from 'components/atoms/LoadingButton/LoadingButton.component';
import { validateForm } from 'components/molecules/Form/formValidator';
import { isoregioncodes } from 'common/lookups/isoregioncodes.lookup';
import { isocountrycodes } from 'common/lookups/isocountrycodes.lookup';
import { useRecoilState } from 'recoil';
import { bannerSuccess } from 'state/selectors/banner.selectors';

const fields = [
  {
    name: 'addressType',
    label: 'AddressType',
    fieldType: 'select',
    gridSize: 12,
    options: [
      {
        code: 'CUST',
        value: 'Customer',
      },
    ],
    required: true,
  },
  {
    name: 'addrline1',
    label: 'AddressLine1',
    fieldType: 'text',
    gridSize: 12,
    length: 60,
    required: true,
  },
  {
    name: 'addrline2',
    label: 'AddressLine2',
    fieldType: 'text',
    gridSize: 12,
    length: 60,
  },
  {
    name: 'city',
    label: 'City',
    fieldType: 'text',
    gridSize: 12,
    length: 40,
    required: true,
  },
  {
    name: 'regioncode',
    label: 'State',
    fieldType: 'lookup',
    gridSize: 4,
    length: 6,
    lookup: isoregioncodes,
    required: true,
  },
  {
    name: 'countrycode',
    label: 'Country',
    fieldType: 'lookup',
    gridSize: 4,
    length: 3,
    lookup: isocountrycodes,
  },
  {
    name: 'postalcode',
    label: 'PostalCode',
    fieldType: 'text',
    gridSize: 4,
    length: 10,
  },
];

export default function SuperDivisionAddressNewModal({
  open,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [address, setAddress] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [, setBannerSuccess] = useRecoilState(bannerSuccess);

  const handleChange = (key, value, error) => {
    console.log(key, value, error);
    setAddress((ad) => ({
      ...ad,
      [key]: value,
    }));
    setErrors((errs) => {
      console.log(errors);
      return {
        ...errs,
        [key]: error,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const errs = validateForm(fields, address);
      if (!_.isEmpty(errs)) {
        setErrors(errs);
        return;
      }

      setLoading(true);
      const resp = await axiosRequest().post(`${getMasterDataBaseUrl()}/addresses`, address);
      onSubmit(_.get(resp, 'data.data'));
      setAddress({});
      onClose();

      setBannerSuccess('address created successfully');
    } catch (e) {
      setErrors(extractErrors(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Address</DialogTitle>
      <DialogContent>
        <Form fields={fields} data={address} errors={errors} onChange={handleChange} />
      </DialogContent>
      <DialogActions sx={{ m: '10px' }}>
        <Button variant="outlined" size="medium" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton loading={loading} color="primary" onClick={handleSubmit} autoFocus>
          OK
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
