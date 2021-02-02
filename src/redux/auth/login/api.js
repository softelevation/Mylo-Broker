import axios from 'axios';
import {config} from '../../../utils/config';
export const Api = async (mobile) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/user/registered`,
    headers,
    data: {
      phone_no: `${mobile}`,
    },
  });
};
