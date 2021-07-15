/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Block, ImageComponent} from '../../components';
import {light} from '../../components/theme/colors';
import {loginSuccess, socketConnection} from '../../redux/action';
import {strictValidString} from '../../utils/commonUtils';
import io from 'socket.io-client';
import messaging from '@react-native-firebase/messaging';

const Splash = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const callAuthApi = async () => {
    const token = await AsyncStorage.getItem('token');
    if (strictValidString(token)) {
      dispatch(loginSuccess(token));
      setTimeout(() => {
        nav.reset({
          routes: [{name: 'Home'}],
        });
      }, 3000);
    } else {
      setTimeout(() => {
        nav.reset({
          routes: [{name: 'Auth'}],
        });
      }, 3000);
    }
  };
  useEffect(() => {
    callAuthApi();
    const socket = io('http://104.131.39.110:3000');
    socket.on('connect', (a) => {
      dispatch(socketConnection(socket));
      console.log('true', socket.connected); // true
    });
  }, []);

  useEffect(() => {
    requestUserPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
    }
  };
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  return (
    <Block safearea center middle secondary>
      <Block
        borderColor={light.primary}
        flex={false}
        borderWidth={3}
        borderRadius={10}>
        <ImageComponent name="logo" height={150} width={150} />
      </Block>
    </Block>
  );
};
export default Splash;
