import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { Form } from 'components/molecules/Form/Form.component';
import { axiosRequest, getMasterDataBaseUrl } from 'common/api/axios.request';
import _ from 'lodash';
import { extractErrors } from 'common/errors/errors.helper';
import Page from 'components/molecules/Page/Page.component';import { validateForm } from 'components/molecules/Form/formValidator';
import { isoregioncodes } from 'common/lookups/isoregioncodes.lookup';
import { isocountrycodes } from 'common/lookups/isocountrycodes.lookup';
import { useRecoilState } from 'recoil';
import { bannerSuccess } from 'state/selectors/banner.selectors';
import Panel from 'components/atoms/Panel/Panel.comonent';
import PanelActions from 'components/atoms/PanelActions/PanelActions.component';
import LoadingButton from 'components/atoms/LoadingButton/LoadingButton.component';
import PanelBody from 'components/atoms/PanelBody/PanelBody.component';
import SaveIcon from '@mui/icons-material/Save';

function __getBreadcrumbItems() {
  return [
    {
      id: 'NewAddress',
      label: 'New Address',
      route: '/address/create',
    },
  ];
}

const fields = [
  {
    name: 'id',
    label: 'Id',
    fieldType: 'number',
    gridSize: 4,
    required: true,
  },
  {
    name: 'addressType',
    label: 'AddressType',
    fieldType: 'select',
    gridSize: 4,
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
    required: true,
  },  
  {
    name: 'addrline3',
    label: 'AddressLine3',
    fieldType: 'text',
    gridSize: 12,
  },
  {
    name: 'city',
    label: 'City',
    fieldType: 'text',
    gridSize: 4,
    length: 10,
    required: true,
  },
  {
    name: 'regioncode',
    label: 'State',
    fieldType: 'lookup',
    gridSize: 4,
    length: 10,
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
  }
];

function CreateAddress({
  open,
  onClose = () => {},
  onSubmit = () => {},
}) {
  
  const [address, setAddress] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [, setBannerSuccess] = useRecoilState(bannerSuccess);
  const [hasChanges, setHasChanges] = useState(false);
  const [details, setDetails] = useState({});


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

  const handleFormChange = (key, value, error) => {
    setHasChanges(true);
    setDetails((details) => ({
      ...details,
      [key]: value,
    }));
    setErrors((errors) => ({
      ...errors,
      [key]: error,
    }));
  };

  return (
    <Page title="New Address" breadcrumbs={__getBreadcrumbItems()}>
      <PanelActions>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="primary"
          size="medium"
          //onClick={handleSave}
          startIcon={<SaveIcon />}
          //disabled={!hasChanges}
          >
          Save & Close
        </LoadingButton>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="primary"
          size="medium"
          //onClick={handleSave}
          startIcon={<SaveIcon />}
          //disabled={!hasChanges}
          >
          Save
        </LoadingButton>
        <Button variant="outlined" size="medium" >
          Close
        </Button>
      </PanelActions>
      <PanelBody>
        <Panel>
          <Form
            fields={fields}
            data={details}
            errors={errors}
            fieldSize="small"
            onChange={handleFormChange}
          />
        </Panel>
      </PanelBody>
    </Page>
  );
}

export default CreateAddress;
