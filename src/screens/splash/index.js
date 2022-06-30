/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
import {useDispatch} from 'react-redux';
import {Block, ImageComponent} from '../../components';
import {light} from '../../components/theme/colors';
import {loginSuccess, socketConnection} from '../../redux/action';
import {Alerts, strictValidString} from '../../utils/commonUtils';
import Geolocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';
import {Linking, PermissionsAndroid, Platform} from 'react-native';
import {locationRequest} from '../../redux/action';
import {SocketContext} from '../../utils/socket';

const Splash = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

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
    // const socket = io(config.Api_Url);
    socket.on('connect', (a) => {
      dispatch(socketConnection(socket));
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

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch(locationRequest(position.coords));
      },
      (error) => {},
      {
        enableHighAccuracy: false,
        timeout: 15000,
      },
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'MyloPro App Location Permission',
          message:
            'MyloPro App App needs access to your location ' +
            'so you can access the geolocation service.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        // if (Platform.OS === 'android') {
        //   BackHandler.exitApp();
        // }
        Alerts(
          "You can't acess the Geolocation Service",
          'Please give access to Location service from the app settings',
        );
        setTimeout(() => {
          Linking.openSettings();
        }, 2000);
        // requestCameraPermission();
      } else {
        Alerts(
          "You can't acess the Geolocation Service",
          'Please give access to Location service',
        );
        requestCameraPermission();
        // if (Platform.OS === 'android') {
        //   BackHandler.exitApp();
        // }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      requestCameraPermission();
    }
  }, []);

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
