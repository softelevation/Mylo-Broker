import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, CustomButton, ImageComponent, Text} from '../components';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {DrawerData} from '../utils/static-data';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {loginSuccess} from '../redux/action';
import {strictValidObjectWithKeys} from '../utils/commonUtils';
import Switch from 'react-native-switch-pro';
import {config} from '../utils/config';
import axios from 'axios';

const DrawerScreen = ({state}) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((v) => v.user.profile.user);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const newStatus = user.status === '1' ? true : false;
    setStatus(newStatus);
  }, [user]);

  const renderHeight = (icon) => {
    switch (icon) {
      case 'become_broker_icon':
        return 19;
      case 'terms_icon':
        return 19;
      case 'logout_icon':
        return 14.5;
      default:
        return 19.5;
    }
  };
  const renderWidth = (icon) => {
    switch (icon) {
      case 'become_broker_icon':
        return 19;
      case 'terms_icon':
        return 14;
      case 'logout_icon':
        return 19.5;
      case 'noti_icon':
        return 19.5;
      default:
        return 17.5;
    }
  };

  const navigateHelpers = async (val) => {
    if (val === 'Login') {
      try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        dispatch(loginSuccess(''));
        nav.reset({
          routes: [{name: 'Auth'}],
        });
      } catch (error) {}
    } else {
      nav.navigate(val);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <CustomButton
        onPress={() => navigateHelpers(item.nav)}
        row
        center
        flex={false}
        color="transparent"
        padding={[hp(1.5), wp(5), hp(1.5), wp(5)]}>
        <Block flex={false} style={{width: wp(7)}}>
          <ImageComponent
            name={item.icon}
            height={renderHeight(item.icon)}
            width={renderWidth(item.icon)}
          />
        </Block>
        <Text size={16} semibold margin={[0, wp(8), 0, wp(5)]}>
          {item.name}
        </Text>
        {index === state.index && (
          <Block
            flex={false}
            secondary
            borderRadius={10}
            style={{height: 10, width: 10}}
          />
        )}
      </CustomButton>
    );
  };

  const getStatus = async (changeState = '') => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    axios({
      method: 'post',
      url: `${config.Api_Url}/user/broker-status`,
      headers,
      data: {
        status: changeState,
      },
    }).then((res) => {
      const newStatus = res.data === '1' ? true : false;
      setStatus(newStatus);
    });
  };

  const changeStatus = (value) => {
    if (value) {
      getStatus('1');
    } else {
      getStatus('2');
    }
  };
  return (
    <>
      <Block safearea>
        <Block
          secondary
          padding={[hp(4), wp(3), hp(4), wp(3)]}
          row
          center
          flex={false}>
          <Block
            flex={false}
            borderWidth={1}
            borderColor="#fff"
            borderRadius={60}>
            <ImageComponent name="avatar" height="80" width="80" radius={80} />
          </Block>
          <Block margin={[0, wp(4), 0, wp(4)]} flex={false}>
            <Text white bold>
              {strictValidObjectWithKeys(user) && user.name}
            </Text>
            <TouchableOpacity onPress={() => nav.navigate('Profile')}>
              <Text
                margin={[hp(1), 0, 0, 0]}
                bold
                color="rgba(255,255,255,0.7)"
                body>
                View Profile
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
        <Block row flex={false} padding={[hp(1.5), wp(5), hp(1.5), wp(5)]}>
          <Text size={16} semibold>
            Status
          </Text>
          <Switch
            style={{marginLeft: wp(7)}}
            value={status}
            onSyncPress={(value) => {
              changeStatus(value);
            }}
          />
        </Block>
        <Block padding={[0, wp(2)]} flex={false}>
          <FlatList data={DrawerData} renderItem={_renderItem} />
        </Block>
      </Block>
    </>
  );
};
export default DrawerScreen;
