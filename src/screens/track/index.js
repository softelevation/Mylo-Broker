/* eslint-disable react-hooks/exhaustive-deps */
// import {useNavigation} from '@react-navigation/native';
// import React, {useEffect, useRef, useState} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {Block, ImageComponent} from '../../components';
// import MapView, {Marker} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import Header from '../../common/header';
// import MapViewDirections from 'react-native-maps-directions';

// const origin = {latitude: -33.8623719, longitude: 151.2211646};
// const destination = {latitude: -33.8729566, longitude: 151.1927314};
// const GOOGLE_MAPS_APIKEY = 'AIzaSyADePjPgnwznPmlGboEQlTFWLHZIxAIgaQ';

// const TrackBroker = ({
//   route: {
//     params: {item},
//   },
// }) => {
//   const mapRef = useRef();
//   const nav = useNavigation();
//   // const brokerData = useSelector((state) => state.broker.list.broker.data);
//   const [location, setlocation] = useState({
//     latitude: 0,
//     longitude: 0,
//     latitudeDelta: 0.09,
//     longitudeDelta: 0.02,
//   });

//   const getDefaultCoords = () => {
//     return {
//       longitude: 151.2099,
//       latitude: -33.865143,
//     };
//   };

//   const isMapRegionSydney = (coords) => {
//     return (
//       coords.longitude >= 148.601105 &&
//       coords.longitude <= 151.75 &&
//       coords.latitude >= -35.353333 &&
//       coords.latitude <= -31.083332
//     );
//   };
//   useEffect(() => {
//     const watchId = Geolocation.getCurrentPosition(
//       (position) => {
//         let region = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           latitudeDelta: 0.00922 * 1.5,
//           longitudeDelta: 0.00421 * 1.5,
//           // angle: position.coords.heading,
//         };

//         setlocation(region);
//       },
//       (error) => console.log(error),
//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//       },
//     );

//     return () => Geolocation.clearWatch(watchId);
//   }, []);
//   return (
//     <Block>

//       <View style={styles.container}>
//         <MapView
//           ref={mapRef}
//           // minZoomLevel={15}
//           // maxZoomLevel={20}
//           zoomControlEnabled
//           showsUserLocation={true}
//           provider="google"
//           style={styles.map}
//           initialRegion={location}
//           onRegionChangeComplete={async (coords) => {
//             if (!isMapRegionSydney(coords)) {
//               if (isMapRegionSydney(location)) {
//                 mapRef && mapRef.current.animateToCoordinate(location);
//                 setlocation({
//                   longitude: location.longitude,
//                   latitude: location.latitude,
//                 });
//               } else {
//                 mapRef &&
//                   mapRef.current.animateToCoordinate(getDefaultCoords());
//                 setlocation({
//                   longitude: 151.2099,
//                   latitude: -33.865143,
//                 });
//               }
//               return;
//             }
//           }}>
//           <MapViewDirections
//             origin={origin}
//             destination={destination}
//             apikey={GOOGLE_MAPS_APIKEY}
//           />
//           <Marker
//             title={'me'}
//             coordinate={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//             }}>
//             <ImageComponent name={'customer_icon'} height="40" width="40" />
//           </Marker>
//           {/* {brokerData && (
//             <Marker
//               title={brokerData[3].name}
//               coordinate={{
//                 latitude: brokerData[3].latitude,
//                 longitude: brokerData[3].longitude,
//               }}>
//               <ImageComponent name={'map_person_icon'} height="40" width="40" />
//             </Marker>
//           )} */}
//         </MapView>
//       </View>
//     </Block>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
// export default TrackBroker;
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// import imagePath from '../constants/imagePath';
import MapViewDirections from 'react-native-maps-directions';
import {getCurrentLocation, locationPermission} from '../../utils/helper';
import images from '../../assets';
import {constants} from '../../utils/config';
import useHardwareBack from '../../components/usehardwareBack';
import {useRoute} from '@react-navigation/native';
import {
  strictValidObjectWithKeys,
  strictValidString,
} from '../../utils/commonUtils';
import Header from '../../common/header';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ImageComponent} from '../../components';
import {light} from '../../components/theme/colors';
// import Loader from '../components/Loader';
// import {locationPermission, getCurrentLocation} from '../helper/helperFunction';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Home = ({navigation}) => {
  const {params} = useRoute();
  const {data} = params;
  console.log('data: ', data);

  const mapRef = useRef();
  const markerRef = useRef();

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

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  const updateState = (data) => setState((state) => ({...state, ...data}));

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 4 second', heading);
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
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (strictValidObjectWithKeys(data)) {
      fetchValue(data);
    }
  }, [data]);

  const fetchValue = (data) => {
    console.log('this is data', data);
    updateState({
      destinationCords: {
        // latitude: 30.6783634,
        // longitude: 76.7229952,
        latitude: data.latitude,
        longitude: data.longitude,
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
        <View style={{alignItems: 'center', marginVertical: 16}}>
          <Text>Time left: {time.toFixed(0)} </Text>
          <Text>Distance left: {distance.toFixed(0)}</Text>
        </View>
      )}
      <View style={{flex: 1}}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          showsUserLocation
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
              strokeColor="red"
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={(result) => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
                fetchTime(result.distance, result.duration),
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      // right: 30,
                      // bottom: 300,
                      // left: 30,
                      // top: 100,
                    },
                  });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: heightPercentageToDP(2),
            right: widthPercentageToDP(3),
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 40,
          }}
          onPress={onCenter}>
          {/* <Image
            source={images.current_loc_icon}
            style={{height: 40, width: 40,tintColor:''}}
          /> */}
          <ImageComponent
            name="current_loc_icon"
            height={40}
            width={40}
            color={light.link}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.bottomCard}>
        <Text>Where are you going..?</Text>
        <TouchableOpacity onPress={onPressLocation} style={styles.inpuStyle}>
          <Text>Choose your location</Text>
        </TouchableOpacity>
      </View> */}
      {/* <Loader isLoading={isLoading} /> */}
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
});

export default Home;
