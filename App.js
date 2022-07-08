import React, {useEffect} from 'react';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import rootSaga from './src/redux/saga';
import FlashMessage from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import {ActivityIndicator, Alert, Modal, StyleSheet} from 'react-native';
import {Alerts} from './src/utils/commonUtils';
import {light} from './src/components/theme/colors';
import {socket, SocketContext} from './src/utils/socket';
import {ErrorBoundary} from 'react-error-boundary';
import {Block, ImageComponent, Text} from './src/components';
import {BackHandler, DeviceEventEmitter} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {sagaMiddleware, store} from './src/redux/store';
import codePush from 'react-native-code-push';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
sagaMiddleware.run(rootSaga);
let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

const App = () => {
  const [status, setStatus] = React.useState(false);
  const [progress, setProgress] = React.useState(false);

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

  useEffect(() => {
    codePush.sync(
      {
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
  }, []);
  const codePushStatusDidChange = (syncStatus) => {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for update.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Download packaging....');
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('Awaiting user action....');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update');
        setProgress(false);
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('codepush status up to date');
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        console.log('update cancel by user');
        setProgress(false);
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed and will be applied on restart.');
        setProgress(false);
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log('An unknown error occurred');
        setProgress(false);
        break;
    }
  };
  const codePushDownloadDidProgress = (pro) => {
    setProgress(pro);
  };

  const showProgressView = () => {
    return (
      <Modal visible={true} transparent>
        <Block center middle color={'rgba(0,0,0,0.8)'}>
          <Block
            center
            flex={false}
            borderRadius={8}
            padding={[hp(2), wp(10)]}
            color="#fff">
            <Text margin={[hp(0.5), 0, 0]} capitalize>
              In Progress....
            </Text>

            <Block flex={false} center>
              <Text margin={[8, 0, 0]}>{`${(
                Number(progress?.receivedBytes) / 1048576
              ).toFixed(2)}MB/${(
                Number(progress?.totalBytes) / 1048576
              ).toFixed(2)}`}</Text>
              <Block flex={false} center margin={[hp(1), 0]}>
                <ActivityIndicator color={light.secondary} />
              </Block>
              <Text>
                {(
                  (Number(progress?.receivedBytes) /
                    Number(progress?.totalBytes)) *
                  100
                ).toFixed(0)}
                %
              </Text>
            </Block>
          </Block>
        </Block>
      </Modal>
    );
  };
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
        <ImageComponent name={'bug_icon'} height={330} width={400} />
        <Text> Something went wrong: </Text>
        <Text> Please Restart Your Application </Text>
      </Block>
    );
  }

  return (
    <SocketContext.Provider value={socket}>
      {progress ? showProgressView() : null}

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

export default codePush(codePushOptions)(App);
