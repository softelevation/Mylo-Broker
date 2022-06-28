import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {BackHandler, FlatList, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Header from '../../common/header';
import {Block, CustomButton} from '../../components';
import {customerListRequest, profileRequest} from '../../redux/action';
import io from 'socket.io-client';
import {handleBackPress} from '../../utils/commonAppUtils';
import messaging from '@react-native-firebase/messaging';
import {SocketContext} from '../../utils/socket';

const Request = ({navigationState}) => {
  const {routes, index} = navigationState;
  const dispatch = useDispatch();
  const selected = index;
  const navigation = useNavigation();
  const socket = useSelector((state) => state.socket.data);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(remoteMessage, 'remoteMessage');
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate('Notifications');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValues = (name) => {
    if (name === 'PastRequest') {
      return 'Past';
    }
    return 'Upcoming';
  };

  useEffect(() => {
    const BackButton = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => BackButton.remove();
  }, []);

  useEffect(() => {
    socket.on('refresh_feed', (msg) => {
      if (msg.type === 'book_broker') {
        dispatch(customerListRequest());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(profileRequest());
      dispatch(customerListRequest());
    }, []),
  );

  if (loading) {
    return null;
  }

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
