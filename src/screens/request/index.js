import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
import {BackHandler, FlatList, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Header from '../../common/header';
import {Block, CustomButton} from '../../components';
import {customerListRequest, profileRequest} from '../../redux/action';
import {handleBackPress} from '../../utils/commonAppUtils';
import messaging from '@react-native-firebase/messaging';
import {SocketContext} from '../../utils/socket';

const Request = ({navigationState}) => {
  const {routes, index} = navigationState;
  const dispatch = useDispatch();
  const selected = index;
  const navigation = useNavigation();
  // const socket = useSelector((state) => state.socket.data);

  const socket = useContext(SocketContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp((remoteMessage) => {
      navigation.navigate('Notifications');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
        contentContainerStyle={styles.FlatListStyle}
        keyExtractor={(item) => item.key}
        renderItem={({item, index}) => {
          return (
            <ButtonStyle
              activeOpacity={1}
              flex={false}
              secondary
              style={
                selected === index
                  ? styles.selectedStyle
                  : styles.unSelectedStyle
              }
              onPress={() => navigation.navigate(item.name)}>
              <CustomText style={selected === index && styles.selectedText}>
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
const styles = StyleSheet.create({
  FlatListStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  selectedStyle: {
    borderBottomColor: '#fff',
    borderBottomWidth: 4,
  },
  unSelectedStyle: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 4,
  },
  selectedText: {
    color: '#fff',
    fontWeight: '500',
  },
});
export default Request;
