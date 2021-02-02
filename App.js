import React, {useEffect} from 'react';
import Routes from './src/routes';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Text} from 'react-native';
import PushNotification from 'react-native-push-notification';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import rootreducer from './src/redux/reducer';
import rootSaga from './src/redux/saga';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootreducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

export const LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Welcome to Mylo Pro',
    // message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
};

const App = () => {
  useEffect(() => {
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    LocalNotification();
  });

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
