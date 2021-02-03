import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import * as navigation from '../routes/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';

const pushTokenData = {
  token: null,
  platform: null,
};

const configurePush = () => {
  PushNotification.configure({
    onRegister: onRegister,
    onNotification: onNotificationReceived,

    largeIcon: 'ic_notification',
    smallIcon: 'ic_notification',
    senderID: '29496895320',
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.popInitialNotification(async (notification) => {
    // When app is in background or not running and notification is clicked
    if (notification) {
      await AsyncStorage.setItem('pushNotificationTapped', '1');
      onNotificationClicked();
    }
  });
};

function onRegister(data) {
  console.log(data, 'token');
  let currentPlatform = 'Android';
  if (Platform.OS === 'ios') {
    currentPlatform = 'ios';
  }
  pushTokenData.token = data.token;
  pushTokenData.platform = currentPlatform;
}

function onNotificationReceived(notification) {
  if (notification.userInteraction) {
    onNotificationClicked();
  }
}

function onNotificationClicked() {
  AsyncStorage.getItem('loggedOut').then((result) => {
    if (!result) {
      navigation.navigate('Notifications');
    }
  });
}

function toastLocalNotification(notification) {
  PushNotification.localNotification({
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_launcher',
    title: 'Check Notification',
    message: 'message',
    playSound: true,
    soundName: 'default',
  });
}

export {configurePush, pushTokenData, toastLocalNotification};
