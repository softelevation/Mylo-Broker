import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {light} from './theme/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1000,
  },
  mainContainer: {
    borderRadius: 10,
    shadowColor: 'black',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    shadowOffset: {width: 0, height: 2},
    maxWidth: 150,
    maxHeight: 150,
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
});

const ActivityLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <ActivityIndicator size={'large'} color={light.secondary} />
      </View>
    </View>
  );
};

export default ActivityLoader;
