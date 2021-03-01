import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
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

const RootStack = createStackNavigator();

const Routes = () => {
  useEffect(() => {
    const socket = io('http://104.131.39.110:3000');
    socket.on('customer_details', (msg) => {
      console.log(msg, 'msg');
      const color = msg.type === 0 ? '#39B54A' : light.accent;
      Alerts(msg.messages, '', color);
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={{flex: 1, backgroundColor: light.secondary}}>
        <StatusBar barStyle="light-content" />
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
