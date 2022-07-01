/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  AppState,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {getCurrentLocation, locationPermission} from '../../utils/helper';
import {constants} from '../../utils/config';
import useHardwareBack from '../../components/usehardwareBack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {strictValidObjectWithKeys} from '../../utils/commonUtils';
import Header from '../../common/header';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Block, Button, ImageComponent} from '../../components';
import {light} from '../../components/theme/colors';
import {useSelector} from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import {SocketContext} from '../../utils/socket';
import AsyncStorage from '@react-native-community/async-storage';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Home = ({navigation}) => {
  const {params} = useRoute();
  const appState = useRef(AppState.currentState);
  const {data} = params;
  const mapRef = useRef();
  const markerRef = useRef();
  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    curLoc: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });
  const {goBack} = useNavigation();
  const {curLoc, time, distance, destinationCords, coordinate} = state;
  const updateState = (d) => setState((s) => ({...s, ...d}));
  const locationReducer = useSelector((v) => v.location.data);

  const updateValuesOnSocket = async (latitude, longitude, heading) => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('tracking_for_booking', {
      token: token,
      booking_id: data.id,
      current_latitude: latitude,
      current_longitude: longitude,
      current_angle: heading,
    });
  };
  useEffect(() => {
    if (strictValidObjectWithKeys(locationReducer)) {
      const {latitude, longitude, heading} = locationReducer;
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });

      updateValuesOnSocket(latitude, longitude, heading);
    }
  }, [locationReducer]);

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 1 minute', latitude, longitude);
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
      updateValuesOnSocket(latitude, longitude, heading);
    }
  };

  useEffect(() => {
    const int = setInterval(() => {
      getLiveLocation();
    }, 4000);
    return () => clearInterval(int);
  }, []);

  // useEffect(() => {
  //   getLiveLocation();
  // }, []);

  useEffect(() => {
    if (strictValidObjectWithKeys(data)) {
      fetchValue(data);
    }
  }, [data]);

  const fetchValue = (data) => {
    updateState({
      destinationCords: {
        latitude: 30.6783634,
        longitude: 76.7229952,
        // latitude: data.latitude,
        // longitude: data.longitude,
      },
    });
  };

  const handleBack = () => {
    navigation.navigate('UpcomingStack');
    return true;
  };

  useHardwareBack(handleBack);
  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS === 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };
  const onhandleDelete = async (id, status) => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('request', {id, status, token});
    goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        centerText="Track Your Broker"
        leftIcon={true}
        menu={'left_arrow_icon'}
        menuColor="#fff"
        navigation
      />
      {distance !== 0 && time !== 0 && (
        <Block center margin={[16, 0]}>
          <Text>Time left: {time.toFixed(0)} </Text>
          <Text>Distance left: {distance.toFixed(0)}</Text>
        </Block>
      )}
      <Block flex={1}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker.Animated ref={markerRef} coordinate={coordinate}>
            {/* <Image
              source={images.attachment_icon}
              style={{
                width: 40,
                height: 40,
                transform: [{rotate: `${heading}deg`}],
              }}
              resizeMode="contain"
            /> */}
          </Marker.Animated>

          {Object.keys(destinationCords).length > 0 && (
            <Marker coordinate={destinationCords} />
          )}

          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              apikey={constants.MAP_KEY}
              strokeWidth={6}
              strokeColor="green"
              optimizeWaypoints={true}
              onStart={(p) => {
                console.log(
                  `Started routing between "${p.origin}" and "${p.destination}"`,
                );
              }}
              onReady={(result) => {
                fetchTime(result.distance, result.duration);
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {},
                });
              }}
              onError={(errorMessage) => {
                console.log('GOT AN ERROR ====>', errorMessage);
              }}
            />
          )}
        </MapView>
        <TouchableOpacity style={styles.onCenterStyle} onPress={onCenter}>
          <ImageComponent
            name="current_loc_icon"
            height={40}
            width={40}
            color={light.link}
          />
        </TouchableOpacity>
        <Block flex={false} style={styles.button}>
          <Button
            onPress={() => {
              onhandleDelete(data.id, 'completed');
            }}
            color={'secondary'}>
            Complete Booking{' '}
          </Button>
        </Block>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inpuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
  onCenterStyle: {
    position: 'absolute',
    bottom: heightPercentageToDP(12),
    right: widthPercentageToDP(3),
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 40,
  },
  button: {
    position: 'absolute',
    bottom: heightPercentageToDP(0),
    // right: widthPercentageToDP(3),
    right: 0,
    left: 0,
    padding: 10,
    borderRadius: 40,
  },
});

export default Home;
