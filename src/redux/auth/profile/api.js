import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../utils/config';
export const Api = async () => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/user/profile`,
    headers,
  });
};
export const updateApi = async (data) => {
  const {name, email, address, image} = data;
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/user/profile`,
    headers,
    data: {
      name: name,
      email: email,
      address: address,
      image: image,
    },
  });
};
