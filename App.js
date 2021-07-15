import React, {useEffect} from 'react';
import Routes from './src/routes';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import rootreducer from './src/redux/reducer';
import rootSaga from './src/redux/saga';
// import {configurePush} from './src/utils/push-notification-service';
import FlashMessage from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';
import {Alerts} from './src/utils/commonUtils';
import {light} from './src/components/theme/colors';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootreducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

const App = () => {
  useEffect(() => {
    // configurePush();
  });
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      handleFirstConnectivityChange(state.isConnected);
    });
  }, []);

  const handleFirstConnectivityChange = (isConnected) => {
    console.log(isConnected, 'isConnected');
    if (isConnected === false) {
      Alerts('Error', 'You are offline!', light.warning);
      Alert.alert(
        'It seems that you are offline. Please check your internet connection',
      );
    } else {
      Alerts('Success', 'You are online!', light.success);
    }
  };

  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
