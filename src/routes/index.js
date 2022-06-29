import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {PostLoginScreen, PreLaunchScreen, PreLoginScreen} from './sub-routes';
import {SafeAreaView, StatusBar} from 'react-native';
import {light} from '../components/theme/colors';
import {navigationRef} from './NavigationService';
import {useSelector} from 'react-redux';
import {Alerts, strictValidObjectWithKeys} from '../utils/commonUtils';
import io from 'socket.io-client';
import {config} from '../utils/config';
import BrokerDetails from '../common/dialog/broker_details';
import messaging from '@react-native-firebase/messaging';

const RootStack = createStackNavigator();

const Routes = () => {
  const status = useSelector((state) => state.user.profile.user);
  const [customerDetails, setCustomerDetails] = React.useState({});

  useEffect(() => {
    const socket = io(config.Api_Url);
    socket.on('customer_details', (msg) => {
      if (status.status === '1') {
        setCustomerDetails(msg);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alerts(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        light.success,
      );
    });
    return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={{flex: 1, backgroundColor: light.secondary}}>
        <StatusBar barStyle="light-content" />
        {strictValidObjectWithKeys(customerDetails) && (
          <BrokerDetails
            brokerDetails={customerDetails}
            setBrokerDetails={() => setCustomerDetails({})}
          />
        )}
        <RootStack.Navigator
          screenOptions={{
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
          }}
          initialRouteName="Splash"
          headerMode="none">
          <RootStack.Screen name="Splash" component={PreLaunchScreen} />
          <RootStack.Screen name="Auth" component={PreLoginScreen} />
          <RootStack.Screen name="Home" component={PostLoginScreen} />
        </RootStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Routes;
