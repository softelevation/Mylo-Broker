/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Block, CustomButton, ImageComponent, Text} from '../../components';
import Header from '../../common/header';
import {Alert, FlatList, RefreshControl} from 'react-native';
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
import {strictValidArrayWithLength} from '../../utils/commonUtils';
import ActivityLoader from '../../components/activityLoader';

const Notifications = () => {
  const navigation = useNavigation();
  const [refreshing, setrefreshing] = useState(false);
  const userId = useSelector((state) => state.user.profile.user.id);
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
  useFocusEffect(
    React.useCallback(() => {
      dispatch(notificationRequest());
    }, []),
  );

  useEffect(() => {
    socket.on(`refresh_feed_${userId}`, (msg) => {
      if (msg.type === 'notification') {
        dispatch(notificationRequest());
      }
    });
  }, []);

  useHardwareBack(handleBack);

  const onhandleDelete = async (id, status) => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('notification_badge', {token: token, id: id});
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

  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
    dispatch(notificationRequest());
  };

  const renderCloseIcon = (item) => {
    return (
      <CustomButton onPress={() => cancelRequest(item)}>
        <ImageComponent
          name="close_icon"
          height={17}
          width={17}
          color={light.warning}
        />
      </CustomButton>
    );
  };
  const _renderItem = ({item}) => {
    return (
      <>
        {(item.status === 'accepted' ||
          item.status === 'pending' ||
          item.status === 'in_progress') && (
          <CustomButton
            // disabled={item.status === 'pending'}
            onPress={() =>
              navigation.navigate('RequestDetails', {
                item: item.booking_detail,
              })
            }
            // color={item.status === 'pending' ? 'red' : 'green'}
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
                  Booking #{item.booking_id}{' '}
                  <Text
                    secondary
                    body
                    semibold
                    style={{textTransform: 'capitalize'}}>
                    {item.status}
                  </Text>
                </Text>
                <Text margin={[t1, 0, 0, 0]} grey body>
                  {item.message}
                </Text>
              </Block>
              {renderCloseIcon(item)}
            </Block>
          </CustomButton>
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
                  Booking #{item.booking_id}{' '}
                  <Text
                    secondary
                    body
                    semibold
                    style={{textTransform: 'capitalize'}}>
                    {item.status}
                  </Text>
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
      {!refreshing && loading && <ActivityLoader />}

      <Header
        rightPress={() => clearRequest()}
        rightText={strictValidArrayWithLength(data) ? 'Clear All' : ''}
        centerText={'Notifications'}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
