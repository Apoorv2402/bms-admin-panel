import axios from 'axios';

export const getMasterDataBaseUrl = () => process.env.REACT_APP_API_MASTERDATA_HOST;
export const getAuthBaseUrl = () => process.env.REACT_APP_API_AUTH_HOST;

export function axiosRequest() {
  return axios.create({
    headers: {
      requestId: 'random',
      userId: 1,
    },
  });
}
