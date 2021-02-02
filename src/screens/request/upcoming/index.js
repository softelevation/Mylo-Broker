import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {Block, CustomButton, ImageComponent, Text} from '../../../components';
import ActivityLoader from '../../../components/activityLoader';
import {t1, t2, w3, w6} from '../../../components/theme/fontsize';
import {strictValidObjectWithKeys} from '../../../utils/commonUtils';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import EmptyFile from '../../../components/emptyFile';
import io from 'socket.io-client';
import {customerListRequest} from '../../../redux/action';
import AsyncStorage from '@react-native-community/async-storage';

const UpcomingRequest = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.customer.list.loading);
  const data = useSelector((state) => state.customer.list.data);
  const {upcoming} = data;
  const [socketRes, setSocketRes] = useState();

  useEffect(() => {
    const socket = io('http://104.131.39.110:3000');
    console.log('Connecting socket...');
    socket.on('connect', (a) => {
      setSocketRes(socket);
      console.log('true', socket.connected); // true
    });
    socket.on('refresh_feed', (msg) => {
      if (msg.type === 'book_broker') {
        dispatch(customerListRequest());
      }
      console.log('Websocket event received!', msg);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (v) => {
    return moment(v).format('DD, MMM YYYY');
  };
  const formatTime = (v) => {
    return moment(v).format('hh:mm a');
  };
  const AcceptDeclineRequest = async (id, status) => {
    const token = await AsyncStorage.getItem('token');
    console.log(id, status, token, 'hbkhjbj');

    socketRes.emit('request', {id, status, token});
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
        <Block center row flex={false}>
          <ImageComponent name="avatar" height="50" width="50" radius={50} />
          <Block margin={[0, w3]} flex={false}>
            <Text bold size={18}>
              {item.name}
            </Text>
            <Text margin={[hp(0.5), 0, 0, 0]} grey body>
              Request Id: #{item.id}
            </Text>
          </Block>
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
                {formatTime(item.created_at)}
              </Text>
            </Block>
            <Block margin={[t1, 0]} row center flex={false}>
              <ImageComponent name="calendar_icon" height="14" width="12.25" />
              <Text margin={[0, w3]} grey body>
                {formatDate(item.created_at)}
              </Text>
            </Block>
            <Block margin={[t1, 0]} row center flex={false}>
              <ImageComponent name="location_icon" height="14" width="14" />
              <Text margin={[0, w3]} grey body>
                {item.address}
              </Text>
            </Block>
          </Block>
          <Block flex={false} center middle style={{width: wp(30)}}>
            {item.status === 'pending' ? (
              <>
                <CustomButton
                  onPress={() => AcceptDeclineRequest(item.id, 'in_progress')}
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
                  onPress={() => AcceptDeclineRequest(item.id, 'rejected')}
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
              <Block
                padding={[7]}
                borderRadius={5}
                flex={false}
                color="rgba(87, 185, 86,.3)">
                <Text transform="uppercase" semibold color="#39B54A" size={12}>
                  {'In Progress'}
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
      {isLoad && <ActivityLoader />}
      {strictValidObjectWithKeys(data) && (
        <FlatList
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
