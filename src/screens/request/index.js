import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import Header from '../../common/header';
import {Block, CustomButton} from '../../components';
import {customerListRequest, profileRequest} from '../../redux/action';
import io from 'socket.io-client';

const Request = ({navigationState}) => {
  const {routes, index} = navigationState;
  const dispatch = useDispatch();
  const selected = index;
  const navigation = useNavigation();
  const getValues = (name) => {
    if (name === 'PastRequest') {
      return 'Past';
    }
    return 'Upcoming';
  };

  // const eventCheck = async () => {
  //   const res = await subscribeToChat();
  //   console.log(res, 'res');
  // };
  useEffect(() => {
    dispatch(profileRequest());

    dispatch(customerListRequest());
    const socket = io('http://104.131.39.110:3000');
    console.log('Connecting socket...');
    socket.on('connect', (a) => {
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

  return (
    <Block safearea flex={false}>
      <Header centerText={'Requests'} />
      <FlatList
        data={routes}
        horizontal
        contentContainerStyle={{
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          flex: 1,
        }}
        keyExtractor={(item) => item.key}
        renderItem={({item, index}) => {
          return (
            <ButtonStyle
              activeOpacity={1}
              flex={false}
              secondary
              style={
                selected === index
                  ? {
                      borderBottomColor: '#fff',
                      borderBottomWidth: 4,
                    }
                  : {borderBottomColor: 'transparent', borderBottomWidth: 4}
              }
              onPress={() => navigation.navigate(item.name)}>
              <CustomText
                style={
                  selected === index && {
                    color: '#fff',
                    fontWeight: '500',
                  }
                }>
                {getValues(item.name)}
              </CustomText>
            </ButtonStyle>
          );
        }}
      />
    </Block>
  );
};
const CustomText = styled.Text({
  color: 'rgba(255,255,255,.4)',
  fontSize: 16,
});
const ButtonStyle = styled(CustomButton)({
  paddingVertical: heightPercentageToDP(2),
  width: widthPercentageToDP(50),
  justifyContent: 'center',
  alignItems: 'center',
});
export default Request;
