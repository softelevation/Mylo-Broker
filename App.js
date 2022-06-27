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
import {BackHandler, DeviceEventEmitter} from 'react-native';
import {Alerts} from './src/utils/commonUtils';
import {light} from './src/components/theme/colors';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootreducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

const App = () => {
  const [status, setStatus] = React.useState(false);
  const checkGps = () => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: 'YES',
      // cancel: 'NO',
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
      preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
      providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    })
      .then(function (success) {
        // success => {alreadyEnabled: true, enabled: true, status: "enabled"}
        // Geolocation.getCurrentPosition(
        //   (position) => {
        //     let initialPosition = JSON.stringify(position);
        //   },
        //   (error) => console.log(error),
        //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        // );
      })
      .catch((error) => {
        console.log(error.message);
      });
    BackHandler.addEventListener('hardwareBackPress', () => {
      //(optional) you can use it if you need it
      //do not use this method if you are using navigation."preventBackClick: false" is already doing the same thing.
      LocationServicesDialogBox.forceCloseDialog();
      BackHandler.exitApp();
    });

    DeviceEventEmitter.addListener(
      'locationProviderStatusChange',
      function (status) {
        // only trigger when "providerListener" is enabled
        setStatus(status.enabled);
        if (status.enabled) {
          Alerts('Success', 'Gps status changed to active', light.secondary);
        } else {
          Alerts('Error', 'Gps status changed to inactive', light.warning);
        }
      },
    );
  };
  useEffect(() => {
    checkGps();
    return () => {
      LocationServicesDialogBox.stopListener();
    };
  }, [status]);

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

  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
