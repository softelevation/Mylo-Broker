import {Alert, BackHandler} from 'react-native';

export const handleBackPress = () => {
  Alert.alert('Exit Mylo', 'Do you want to exit the Mylo app?', [
    {
      text: 'Cancel',
    },
    {
      text: 'Leave',
      style: 'destructive',
      onPress: () => BackHandler.exitApp(),
    },
  ]);
  return true;
};
