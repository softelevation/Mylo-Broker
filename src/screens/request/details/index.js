import React, {useState} from 'react';
import {
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';
import Header from '../../../common/header';
import {Block, Text, ImageComponent, Button} from '../../../components';
import {light} from '../../../components/theme/colors';
import {t1, t2, w1, w2, w3, w4, w5} from '../../../components/theme/fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  strictValidObjectWithKeys,
  strictValidString,
} from '../../../utils/commonUtils';
import {useNavigation} from '@react-navigation/native';
import useHardwareBack from '../../../components/usehardwareBack';
import {config} from '../../../utils/config';
const RequestDetails = ({
  route: {
    params: {item},
  },
}) => {
  const [seeMore, setSeeMore] = useState(false);
  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${item.phone_no}`;
    } else {
      phoneNumber = `telprompt:${item.phone_no}`;
    }

    Linking.openURL(phoneNumber);
  };
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('Maps');
    return true;
  };

  useHardwareBack(handleBack);
  const openMessage = () => {
    const url =
      Platform.OS === 'android'
        ? `sms:${item.phone_no}?body=yourMessage`
        : `sms:${item.phone_no}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <Block white>
      <Header
        navigation
        menuColor={'#fff'}
        menu={'left_arrow_icon'}
        centerText={'Customer Details'}
      />
      <Block padding={[t2]} color="secondary" flex={false}>
        <Block flex={false} row center>
          <Block
            alignSelf={'flex-start'}
            flex={false}
            borderRadius={80}
            borderWidth={1}
            borderColor="#fff">
            {strictValidObjectWithKeys(item) &&
            strictValidString(item.image) ? (
              <ImageComponent
                isURL
                name={`${config.Api_Url}/${item.image}`}
                height={70}
                width={70}
                radius={70}
              />
            ) : (
              <ImageComponent
                name="avatar"
                height={70}
                width={70}
                radius={70}
              />
            )}
          </Block>
          <Block flex={false} margin={[0, w5]}>
            <Text style={{width: wp(60)}} transform="uppercase" white medium>
              {item.name}
            </Text>
            {/* <StarRating
              disabled={false}
              starSize={20}
              maxStars={5}
              fullStarColor={light.starColor}
              rating={5}
              starStyle={{marginLeft: w1}}
              containerStyle={{
                width: wp(20),
                marginVertical: t1,
              }}
            /> */}
          </Block>
        </Block>
        <Block margin={[t1, 0, 0, 0]} flex={false} row space={'between'}>
          <Button
            onPress={() => dialCall()}
            shadow
            style={{width: wp(43), borderColor: '#fff', borderWidth: 1}}
            color="secondary">
            Phone
          </Button>
          <Button
            onPress={() => openMessage()}
            shadow
            style={{width: wp(43), borderColor: '#fff', borderWidth: 1}}
            color="secondary">
            Message
          </Button>
        </Block>
      </Block>
      <ScrollView>
        <Block flex={false} margin={[t2, w4]}>
          {strictValidString(item.about_me) && (
            <>
              <Text semibold>About Me</Text>
              <Text
                margin={[t1, 0, 0]}
                numberOfLines={seeMore === true ? undefined : 2}
                size={15}
                regular>
                {item.about_me}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSeeMore(!seeMore);
                }}>
                <Text size={14} secondary regular>
                  {seeMore === true ? 'read less' : 'read more'}
                </Text>
              </TouchableOpacity>
            </>
          )}
          <Text margin={[t2, 0, t1, 0]} semibold>
            Details
          </Text>
          {strictValidString(item.phone_no) && (
            <Block margin={[t1, 0, 0]} flex={false} row>
              <View style={{width: wp(7)}}>
                <ImageComponent
                  style={{width: wp(7)}}
                  name="phone_icon"
                  height={20}
                  width={20}
                />
              </View>
              <Text size={15} margin={[0, w2]}>
                {item.phone_no}
              </Text>
            </Block>
          )}
          {strictValidString(item.email) && (
            <Block margin={[t1, 0, 0]} flex={false} row>
              <View style={{width: wp(7)}}>
                <ImageComponent name="email_icon" height={20} width={20} />
              </View>
              <Text size={15} margin={[0, w2]}>
                {item.email}
              </Text>
            </Block>
          )}
          {strictValidString(item.address) && (
            <Block margin={[t1, 0, 0]} flex={false} row>
              <View style={{width: wp(7)}}>
                <ImageComponent name="address_icon" height={20} width={20} />
              </View>
              <Text size={15} margin={[0, w2]}>
                {item.address}
              </Text>
            </Block>
          )}
        </Block>
      </ScrollView>
      <Block flex={false} padding={[0, wp(5)]}>
        <Button shadow color="secondary">
          Complete Request
        </Button>
      </Block>
    </Block>
  );
};

export default RequestDetails;
