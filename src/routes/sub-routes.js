import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Splash from '../screens/splash';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import Forgot from '../screens/auth/forgot';
import Home from '../screens/Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import DrawerScreen from '../common/drawer';
import Profile from '../screens/auth/profile';
import BecomeBroker from '../screens/become-broker';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Request from '../screens/request';
import UpcomingRequest from '../screens/request/upcoming';
import PastRequest from '../screens/request/past';
import Notifications from '../screens/notifications';

const Tab = createMaterialTopTabNavigator();
const PostLoginStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const transition = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const PreLaunchScreen = () => (
  <PostLoginStack.Navigator
    headerMode="none"
    mode="card"
    initialRouteName="Splash">
    <PostLoginStack.Screen
      name="Splash"
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
      component={Splash}
    />
  </PostLoginStack.Navigator>
);
export const PreLoginScreen = () => (
  <PostLoginStack.Navigator
    headerMode="none"
    mode="card"
    initialRouteName="Login">
    <PostLoginStack.Screen
      name="Login"
      options={transition}
      component={Login}
    />
    <PostLoginStack.Screen
      options={transition}
      name="Register"
      component={Register}
    />
  </PostLoginStack.Navigator>
);

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="UpcomingRequest"
      tabBar={(props) => <Request {...props} />}>
      <Tab.Screen name="UpcomingRequest" component={UpcomingRequest} />
      <Tab.Screen name="PastRequest" component={PastRequest} />
    </Tab.Navigator>
  );
}

const HomeStack = () => (
  <PostLoginStack.Navigator
    headerMode="none"
    mode="card"
    initialRouteName="Maps">
    <PostLoginStack.Screen name="Maps" options={transition} component={Home} />
    <PostLoginStack.Screen
      name="Profile"
      options={transition}
      component={Profile}
    />
  </PostLoginStack.Navigator>
);
function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Maps"
      drawerStyle={{width: widthPercentageToDP(70)}}
      drawerContent={(props) => <DrawerScreen {...props} />}>
      <Drawer.Screen name="Maps" options={transition} component={HomeStack} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="BecomeBroker" component={BecomeBroker} />
      <Drawer.Screen name="Request" component={MyTabs} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}
export const PostLoginScreen = () => (
  <PostLoginStack.Navigator
    headerMode="none"
    mode="card"
    initialRouteName="Home">
    <PostLoginStack.Screen
      name="Home"
      options={transition}
      component={HomeDrawer}
    />
  </PostLoginStack.Navigator>
);
