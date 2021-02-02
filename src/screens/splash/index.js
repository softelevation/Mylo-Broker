/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Block, ImageComponent} from '../../components';
import {light} from '../../components/theme/colors';
import {loginSuccess} from '../../redux/action';
import {strictValidString} from '../../utils/commonUtils';
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  sendMessage,
} from '../../utils/socket';
const Splash = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const callAuthApi = async () => {
    const token = await AsyncStorage.getItem('token');
    if (strictValidString(token)) {
      dispatch(loginSuccess(token));
      setTimeout(() => {
        nav.navigate('Home');
      }, 3000);
    } else {
      setTimeout(() => {
        nav.navigate('Auth');
      }, 3000);
    }
  };
  useEffect(() => {
    callAuthApi();
    initiateSocket();
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
