import { Button } from '@mui/material';
import { axiosRequest, getMasterDataBaseUrl } from 'common/api/axios.request';
import { extractErrors, extractGlobalError } from 'common/errors/errors.helper';
import { glaccounts } from 'common/lookups/glaccounts.lookup';
import { isoregioncodes } from 'common/lookups/isoregioncodes.lookup';
import { joinNonEmpty } from 'common/utils/utils';
import Loading from 'components/atoms/Loading/Loading.component';
import LoadingButton from 'components/atoms/LoadingButton/LoadingButton.component';
import Panel from 'components/atoms/Panel/Panel.comonent';
import PanelActions from 'components/atoms/PanelActions/PanelActions.component';
import { Form } from 'components/molecules/Form/Form.component';
import Page from 'components/molecules/Page/Page.component';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SuperDivisionAddressNewModal from './SuperDivisionAddressNewModal';
import SaveIcon from '@mui/icons-material/Save';
import PanelBody from 'components/atoms/PanelBody/PanelBody.component';
import { useRecoilState } from 'recoil';
import { bannerError, bannerSuccess } from 'state/selectors/banner.selectors';

function __getDetailFields(mode, onClickNewAddress) {
  const fields = [
    {
      name: 'superdivcd',
      fieldType: 'number',
      label: 'ID',
      gridSize: 4,
      length: 4,
      required: true,
      readOnly: mode === 'Create' ? false : true,
    },
    {
      name: 'superdivName',
      fieldType: 'text',
      label: 'Legal Name',
      gridSize: 8,
      length: 50,
      required: true,
    },
    {
      name: 'superdivDbanam',
      fieldType: 'text',
      label: 'DBA Name',
      length: 50,
      gridSize: 8,
    },
    {
      name: 'stmonth',
      fieldType: 'number',
      label: 'Fiscal Year Starting Month',
      gridSize: 4,
      length: 8,
    },
    {
      name: 'corpId',
      fieldType: 'text',
      label: 'Corporate ID',
      gridSize: 4,
      length: 10,
    },
    {
      name: 'intercompanyGl',
      fieldType: 'lookup',
      label: 'Intercompany GL',
      gridSize: 4,
      length: 11,
      lookup: glaccounts,
    },
    {
      name: 'cashReceiptsGl',
      fieldType: 'text',
      label: 'Cash Receipts GL',
      gridSize: 4,
      length: 11,
    },
    {
      name: 'registeredDate',
      fieldType: 'date',
      label: 'Registered Date',
      gridSize: 4,
    },
    {
      name: 'registeredState',
      fieldType: 'lookup',
      label: 'State Registered',
      gridSize: 4,
      length: 2,
      lookup: isoregioncodes,
    },
    {
      name: 'closedayId',
      fieldType: 'number',
      label: 'Close Day ID',
      gridSize: 4,
      readOnly: true,
      length: 10,
    },
    {
      name: 'addrUid',
      fieldType: 'text',
      label: 'Address',
      gridSize: 12,
      valueGetter: ({ row }) => {
        const address = row.address || {};
        return joinNonEmpty(
          [
            address.addrline1 || '',
            address.addrline2 || '',
            address.city || '',
            address.state || '',
            address.country || '',
            address.postalCode || '',
          ],
          ', '
        );
      },
      readOnly: true,
      actions: [{ label: 'New', onClick: onClickNewAddress }],
    },
    {
      name: 'superdivAlias',
      fieldType: 'text',
      label: 'Super Division Alias',
      gridSize: 4,
      length: 1,
    },
    {
      name: 'superdivtext',
      fieldType: 'text',
      label: 'Super Division Prefix',
      gridSize: 4,
      length: 4,
    },
    {
      name: 'inactive',
      fieldType: 'text',
      label: 'Status',
      gridSize: 4,
      valueGetter: ({ row = {} }) => (row.inactive ? 'Inactive' : 'Active'),
      readOnly: true,
    },
  ];

  return fields;
}

function __getBreadcrumbItems(mode) {
  return [
    {
      id: 'list',
      label: 'List',
      route: '/superdivisions',
    },
    {
      id: 'details',
      label: `${mode} Super Division`,
    },
  ];
}

export default function SuperDivisionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fields, setFields] = useState();
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [, setBannerSuccess] = useRecoilState(bannerSuccess);
  const [, setBannerError] = useRecoilState(bannerError);

  useEffect(() => {
    setBreadcrumbs(__getBreadcrumbItems('Create'));
    setFields(__getDetailFields('Create', () => setShowNewAddressModal(true)));
  }, []);

  const getDetailData = useCallback(async () => {
    try {
      setLoading(true);
      const mode = id === 'new' ? 'Create' : 'Edit';
      setBreadcrumbs(__getBreadcrumbItems(mode));
      setFields(__getDetailFields(mode, () => setShowNewAddressModal(true)));

      const resp = await axiosRequest().get(`${getMasterDataBaseUrl()}/superdivisions/${id}`);
      setDetails(_.get(resp, 'data.data'));
      setErrors(_.get(resp, 'data.errors') || {});
      setHasChanges(false);
    } catch (e) {
      console.log(e);
      setBannerError(extractGlobalError(e));
    } finally {
      setLoading(false);
    }
  }, [id, setBannerError]);

  useEffect(() => {
    if (id && id !== 'new') {
      getDetailData();
    } else {
      setDetails({});
    }
  }, [getDetailData, id]);

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

  const handleAddressNewModalSubmit = (address) => {
    setHasChanges(true);
    setDetails((details) => ({
      ...details,
      addrUid: address.addrUid,
      address,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (id === 'new') {
        const resp = await axiosRequest().post(`${getMasterDataBaseUrl()}/superdivisions`, details);
        setDetails(_.get(resp, 'data.data'));
        setErrors(_.get(resp, 'data.errors') || {});
        setBannerSuccess(
          `Super Division [${_.get(resp, 'data.data.superdivcd')}] created successfully`
        );
        navigate(`/superdivisions/${_.get(resp, 'data.data.superdivcd')}`);
      } else {
        const resp = await axiosRequest().put(
          `${getMasterDataBaseUrl()}/superdivisions/${id}`,
          details
        );
        setDetails(_.get(resp, 'data.data'));
        setErrors(_.get(resp, 'data.errors') || {});
        setBannerSuccess(`Super Division [${details.superdivcd}] updated successfully`);
      }
      setHasChanges(false);
    } catch (e) {
      console.log(e);
      const errs = extractErrors(e);
      setErrors(errs);
      if (errs['*']) {
        setBannerError(`Failed to update Super Division: ${errs['*']}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate(`/superdivisions`);
  };

  return (
    <Page title="Super Divisions" breadcrumbs={breadcrumbs}>
      <PanelActions>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleSave}
          startIcon={<SaveIcon />}
          disabled={!hasChanges}>
          Save
        </LoadingButton>
        <Button variant="outlined" size="medium" onClick={handleClose} disabled={id === 'new'}>
          {details.inactive ? 'Activate' : 'Inactivate'}
        </Button>
        <Button variant="outlined" size="medium" onClick={handleClose}>
          Close
        </Button>
      </PanelActions>
      <PanelBody>
        <Panel>
          {loading && <Loading />}
          <Form
            fields={fields}
            data={details}
            errors={errors}
            fieldSize="small"
            onChange={handleFormChange}
          />
        </Panel>
        <SuperDivisionAddressNewModal
          open={showNewAddressModal}
          onSubmit={handleAddressNewModalSubmit}
          onClose={() => setShowNewAddressModal(false)}
        />
      </PanelBody>
    </Page>
  );
}
