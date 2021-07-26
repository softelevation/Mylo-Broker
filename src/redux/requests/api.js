import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';
import TimeZone from 'react-native-timezone';
export const Api = async () => {
  const token = await AsyncStorage.getItem('token');
  const timeZone = await TimeZone.getTimeZone().then(zone => zone);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
    time_zone:timeZone,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/user/customer-reqest`,
    headers,
  });
};

export const statusApi = async (mobile) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/user/customer-reqest`,
    headers,
  });
};
