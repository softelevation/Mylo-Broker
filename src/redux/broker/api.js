import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';
export const Api = async (mobile) => {
  const token = await AsyncStorage.getItem('token');
  const parsedToken = JSON.parse(token);
  console.log(parsedToken, 'parsedToken');
  const headers = {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${parsedToken.token}`,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/user/brokers`,
    headers,
  });
};
