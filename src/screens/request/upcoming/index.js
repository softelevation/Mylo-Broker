import React, {useContext, useEffect, useState} from 'react';
import {Alert, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {Block, CustomButton, ImageComponent, Text} from '../../../components';
import ActivityLoader from '../../../components/activityLoader';
import {t1, t2, w3, w6} from '../../../components/theme/fontsize';
import {
  strictValidObjectWithKeys,
  strictValidString,
} from '../../../utils/commonUtils';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import EmptyFile from '../../../components/emptyFile';
import {customerListRequest} from '../../../redux/action';
import AsyncStorage from '@react-native-community/async-storage';
import {light} from '../../../components/theme/colors';
import {config} from '../../../utils/config';
import {SocketContext} from '../../../utils/socket';

const UpcomingRequest = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.customer.list.loading);
  const data = useSelector((state) => state.customer.list.data);
  const {upcoming} = data;
  const [refreshing, setRefreshing] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('refresh_feed', (msg) => {
      if (msg.type === 'book_broker') {
        dispatch(customerListRequest());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    dispatch(customerListRequest());
  };

  const formatDate = (v) => {
    return moment(v).format('DD, MMM YYYY');
  };
  const formatTime = (v) => {
    return moment(v).format('hh:mm a');
  };
  const onhandleDelete = async (id, status) => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('request', {id, status, token});
  };

  const acceptRequest = (id, status) => {
    Alert.alert(
      'Are you sure?',
      'You want to accept this request',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes, do it',
          onPress: () => onhandleDelete(id, status),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const cancelRequest = (item) => {
    Alert.alert(
      'Are you sure?',
      'You want to cancelled this request',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes, do it',
          onPress: () => onhandleDelete(item.id, 'cancelled'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  const rejectRequest = (id, status) => {
    Alert.alert(
      'Are you sure?',
      'You want to rejected this request',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes, do it',
          onPress: () => onhandleDelete(id, status),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const renderStatus = (key) => {
    switch (key) {
      case 'in_progress':
        return 'In Progress';
      case 'travel_to_booking':
        return 'In Progress';
      default:
        return key;
    }
  };
  const _renderItem = ({item}) => {
    return (
      <CustomButton
        disabled={item.status === 'pending'}
        onPress={() =>
          navigation.navigate('RequestDetails', {
            item: item,
          })
        }
        white
        margin={[t2, w3, 0, w3]}
        borderRadius={10}
        padding={[t2]}
        flex={false}
        shadow>
        <Block space="between" center row flex={false}>
          <Block flex={false} row center>
            {strictValidObjectWithKeys(item) &&
            strictValidString(item.image) ? (
              <ImageComponent
                isURL
                name={`${config.Api_Url}/${item.image}`}
                height={50}
                width={50}
                radius={50}
              />
            ) : (
              <ImageComponent
                name="avatar"
                height={50}
                width={50}
                radius={50}
              />
            )}
            <Block margin={[0, w3]} flex={false}>
              <Text bold size={18}>
                {item.name}
              </Text>
              <Text margin={[hp(0.5), 0, 0, 0]} grey body>
                Request Id: #{item.id}
              </Text>
            </Block>
          </Block>
          {item.status !== 'pending' && (
            <TouchableOpacity
              onPress={() => {
                cancelRequest(item);
              }}>
              <ImageComponent
                name="trash_icon"
                color={light.accent}
                height={20}
                width={20}
              />
            </TouchableOpacity>
          )}
        </Block>
        <Block margin={[t1, 0, 0, 0]} flex={false} row>
          <Block
            flex={false}
            borderWidth={[0, 1, 0, 0]}
            borderColorDeafult
            style={{width: wp(60)}}>
            <Block margin={[t1, 0]} row center flex={false}>
              <ImageComponent name="clock_icon" height="13.5" width="13.5" />
              <Text margin={[0, w3]} grey body>
                {formatTime(item.assign_at)}
              </Text>
            </Block>
            <Block margin={[t1, 0]} row center flex={false}>
              <ImageComponent name="calendar_icon" height="14.5" width="13" />
              <Text margin={[0, w3]} grey body>
                {formatDate(item.assign_at)}
              </Text>
            </Block>
            <Block margin={[t1, 0]} row center flex={false}>
              <ImageComponent name="location_icon" height="14" width="14" />
              <Text margin={[0, w3]} grey body>
                {item.location}
              </Text>
            </Block>
          </Block>
          <Block flex={false} center middle style={{width: wp(30)}}>
            {item.status === 'pending' ? (
              <>
                <CustomButton
                  onPress={() => acceptRequest(item.id, 'in_progress')}
                  padding={[t1, w6]}
                  borderRadius={20}
                  flex={false}
                  borderColor={'#39B54A'}
                  borderWidth={1}
                  color="#39B54A">
                  <Text size={14} color="#fff">
                    Accept
                  </Text>
                </CustomButton>
                <CustomButton
                  onPress={() => rejectRequest(item.id, 'rejected')}
                  padding={[t1, w6]}
                  borderRadius={20}
                  margin={[t2, 0]}
                  flex={false}
                  borderColor={'#B92D00'}
                  borderWidth={1}
                  color="#fff">
                  <Text size={14} color="#B92D00">
                    Reject
                  </Text>
                </CustomButton>
              </>
            ) : (
              <Block flex={false}>
                <Block
                  center
                  padding={[7]}
                  borderRadius={5}
                  flex={false}
                  color="rgba(87, 185, 86,.3)">
                  <Text
                    transform="uppercase"
                    semibold
                    color="#39B54A"
                    size={12}>
                    {renderStatus(item.status)}
                  </Text>
                </Block>
                <Text
                  onPress={() => {
                    if (item.status !== 'in_progress') {
                      onhandleDelete(item.id, 'travel_to_booking');
                      navigation.navigate('TrackScreen', {
                        data: item,
                      });
                    } else {
                      navigation.navigate('TrackScreen', {
                        data: item,
                      });
                    }
                  }}
                  margin={[hp(1), 0, 0]}
                  size={14}
                  underline={true}>
                  Start Booking
                </Text>
              </Block>
            )}
          </Block>
        </Block>
      </CustomButton>
    );
  };
  return (
    <Block white middle>
      {!refreshing && isLoad && <ActivityLoader />}
      {strictValidObjectWithKeys(data) && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={upcoming}
          contentContainerStyle={{paddingBottom: hp(2), flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyFile />}
          renderItem={_renderItem}
        />
      )}
    </Block>
  );
};

export default UpcomingRequest;
