import React, {useEffect} from 'react';
import Routes from './src/routes';
import PushNotification from 'react-native-push-notification';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import rootreducer from './src/redux/reducer';
import rootSaga from './src/redux/saga';
import {
  configurePush,
  toastLocalNotification,
} from './src/utils/push-notification-service';
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
    configurePush();
    toastLocalNotification();
  });

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
