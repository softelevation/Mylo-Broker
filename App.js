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
import {Alert, StyleSheet} from 'react-native';
import {Alerts} from './src/utils/commonUtils';
import {light} from './src/components/theme/colors';
import {socket, SocketContext} from './src/utils/socket';
import {ErrorBoundary} from 'react-error-boundary';
import {Block, Text} from './src/components';
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
      // Alerts('Success', 'You are online!', light.success);
    }
  };
  const errorHandler = (error, componentStack) => {
    console.warn('Component error:', error, componentStack);
  };

  function ErrorFallback({error, componentStack, resetErrorBoundary}) {
    return (
      <Block style={[styles.container]}>
        {/* <ResponsiveImage source={Bugs} initHeight="330" initWidth="400" /> */}
        <Text> Something went wrong: </Text>
        <Text> Please Restart Your Application </Text>
      </Block>
    );
  }

  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
          <Routes />
          <FlashMessage position="top" />
        </ErrorBoundary>
      </Provider>
    </SocketContext.Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
