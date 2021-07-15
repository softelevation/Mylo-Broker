import axios from 'axios';
import {config} from '../../../utils/config';
import messaging from '@react-native-firebase/messaging';
export const Api = async (data) => {
  const {phone_no, otp} = data;
  const fcmToken = await messaging().getToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/user/verify-otp`,
    headers,
    data: {
      phone_no: phone_no,
      otp: otp,
      token: fcmToken,
      social_type: 'N',
    },
  });
};
