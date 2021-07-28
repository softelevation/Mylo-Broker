/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Block, ImageComponent, Text} from '../../components';
import Header from '../../common/header';
import {Alert, FlatList} from 'react-native';
import {t2, t1, w3, w5} from '../../components/theme/fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useHardwareBack from '../../components/usehardwareBack';
import {useDispatch, useSelector} from 'react-redux';
import {notificationRequest} from '../../redux/notification/action';
import EmptyFile from '../../components/emptyFile';
import {light} from '../../components/theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const Notifications = () => {
  const navigation = useNavigation();
  const [data, loading, socket] = useSelector((v) => [
    v.notification.data,
    v.notification.loading,
    v.socket.data,
  ]);
  const dispatch = useDispatch();
  const handleBack = () => {
    navigation.navigate('Maps');
    return true;
  };
  console.log(data, loading, 'data, loading');
  useFocusEffect(
    React.useCallback(() => {
      dispatch(notificationRequest());
    }, []),
  );
  useHardwareBack(handleBack);

  const onhandleDelete = async (id, status) => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('notification_badge', {token: token, id: id});
    console.log(token, id);
    dispatch(notificationRequest());
  };
  const cancelRequest = (item) => {
    Alert.alert(
      'Are you sure?',
      'You want to clear this notification',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes, do it',
          onPress: () => onhandleDelete(item.id),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const clearRequest = () => {
    Alert.alert(
      'Are you sure?',
      'You want to clear all notification',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes, do it',
          onPress: () => onhandleDelete('all'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  const renderCloseIcon = (item) => {
    return (
      <TouchableOpacity onPress={() => cancelRequest(item)}>
        <ImageComponent
          name="close_icon"
          height={14}
          width={14}
          color={light.warning}
        />
      </TouchableOpacity>
    );
  };
  const _renderItem = ({item}) => {
    return (
      <>
        {(item.status === 'accepted' ||
          item.status === 'pending' ||
          item.status === 'in_progress') && (
          <Block
            borderRadius={10}
            shadow
            white
            flex={false}
            margin={[t1, w5]}
            padding={[t2]}>
            <Block flex={false} row>
              <Block flex={false} margin={[heightPercentageToDP(0.5), 0]}>
                <ImageComponent name="accepted_icon" height="10" width="10" />
              </Block>
              <Block margin={[0, w3, 0, w3]}>
                <Text secondary body semibold>
                  Booking #{item.booking_id} accepted
                </Text>
                <Text margin={[t1, 0, 0, 0]} grey body>
                  {item.message}
                </Text>
              </Block>
              {renderCloseIcon(item)}
            </Block>
          </Block>
        )}
        {(item.status === 'rejected' || item.status === 'cancelled') && (
          <Block
            borderRadius={10}
            shadow
            white
            flex={false}
            margin={[t1, w5]}
            padding={[t2]}>
            <Block baseline flex={false} row>
              <ImageComponent name="rejected_icon" height="13" width="13" />
              <Block margin={[0, w3, 0, w3]}>
                <Text accent body semibold>
                  Booking #{item.booking_id} rejected
                </Text>
                <Text margin={[t1, 0, 0, 0]} grey body>
                  {item.message}
                </Text>
              </Block>
              {renderCloseIcon()}
            </Block>
          </Block>
        )}
      </>
    );
  };
  return (
    <Block white safearea>
      <Header
        rightPress={() => clearRequest()}
        rightText="Clear All"
        centerText={'Notifications'}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={containerStyle}
        data={data}
        renderItem={_renderItem}
        ListEmptyComponent={<EmptyFile text="No Notifications" />}
      />
    </Block>
  );
};
const containerStyle = {paddingBottom: t2, flexGrow: 1};

export default Notifications;
