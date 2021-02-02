import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../utils/config';
export const Api = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/V1/customersignupwithotp`,
    headers,
    data: {
      customer: {
        email: `${data.mobile}${config.domain_name}`,
        firstname: data.firstname,
        lastname: data.lastname,
        middlename: '',
        gender: 0,
        store_id: 1,
        website_id: 1,
        addresses: [],
        disable_auto_group_change: 0,
      },
      password: data.password,
      mobile: data.mobile,
      otp: data.otp,
    },
  });
};
