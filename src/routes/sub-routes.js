import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Splash from '../screens/splash';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import DrawerScreen from '../common/drawer';
import Profile from '../screens/auth/profile';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Request from '../screens/request';
import UpcomingRequest from '../screens/request/upcoming';
import PastRequest from '../screens/request/past';
import Notifications from '../screens/notifications';
import RequestDetails from '../screens/request/details/index';
import Terms from '../screens/help/terms';
import Privacy from '../screens/help/privacy';
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
    <PostLoginStack.Screen
      name="Maps"
      options={transition}
      component={MyTabs}
    />
    <PostLoginStack.Screen
      name="Profile"
      options={transition}
      component={Profile}
    />
    <PostLoginStack.Screen
      name="RequestDetails"
      options={transition}
      component={RequestDetails}
    />
  </PostLoginStack.Navigator>
);
const NotificationsStack = () => (
  <PostLoginStack.Navigator
    headerMode="none"
    mode="card"
    initialRouteName="Notifications">
    <PostLoginStack.Screen
      name="Notifications"
      options={transition}
      component={Notifications}
    />
    <PostLoginStack.Screen
      name="RequestDetails"
      options={transition}
      component={RequestDetails}
    />
  </PostLoginStack.Navigator>
);
function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Maps"
      drawerStyle={{width: widthPercentageToDP(70)}}
      drawerContent={(props) => <DrawerScreen {...props} />}>
      <Drawer.Screen name="Request" component={MyTabs} />
      <Drawer.Screen name="Notifications" component={NotificationsStack} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Terms" component={Terms} />
      <Drawer.Screen name="Privacy" component={Privacy} />
      <Drawer.Screen name="Maps" options={transition} component={HomeStack} />
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
