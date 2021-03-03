import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {Modal} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {
  Block,
  Text,
  Button,
  ImageComponent,
  CustomButton,
} from '../../components';
import {light} from '../../components/theme/colors';
import {t1, t3, w1, w5} from '../../components/theme/fontsize';
import {strictValidObjectWithKeys} from '../../utils/commonUtils';

const BrokerDetails = ({brokerDetails, setBrokerDetails}) => {
  const [state, setstate] = useState(true);
  const socket = useSelector((state) => state.socket.data);
  const [delLoader, setDelLoader] = useState(false);
  const [Loader, setLoader] = useState(false);
  const onClose = () => {
    setstate(!state);
    setBrokerDetails();
  };

  const DeclineRequest = async (id, status) => {
    setDelLoader(true);
    const token = await AsyncStorage.getItem('token');
    socket.emit('request', {id, status, token});
    setTimeout(() => {
      setDelLoader(false);
      setBrokerDetails();
    }, 2000);
  };
  const AcceptRequest = async (id, status) => {
    setLoader(true);
    const token = await AsyncStorage.getItem('token');
    socket.emit('request', {id, status, token});

    setTimeout(() => {
      setLoader(false);
      setBrokerDetails();
    }, 2000);
  };
  return (
    <Block flex={false} center middle>
      <Modal
        animationType="slide"
        transparent={true}
        visible={state}
        onRequestClose={() => {
          setstate(!state);
        }}>
        <Block
          color="#000"
          style={dialogPosition}
          white
          padding={[t3, w5, t3, w5]}
          flex={false}>
          <CustomButton
            onPress={() => onClose()}
            flex={false}
            alignSelf="flex-end">
            <ImageComponent
              name="cancel_icon"
              color="#fff"
              height={20}
              width={20}
            />
          </CustomButton>
          <Block flex={false} row center>
            <Block
              alignSelf={'flex-start'}
              flex={false}
              borderRadius={80}
              borderWidth={1}
              borderColor="#fff">
              <ImageComponent
                name="avatar"
                height="70"
                width="70"
                radius={70}
              />
            </Block>
            <Block flex={false} margin={[0, w5]}>
              {strictValidObjectWithKeys(brokerDetails) && (
                <Text white semibold>
                  {brokerDetails.customer_detail.name}
                </Text>
              )}
            </Block>
          </Block>
          <Block flex={false} row space={'between'}>
            <Button
              isLoading={Loader}
              onPress={() => {
                AcceptRequest(brokerDetails.booking_id, 'in_progress');
              }}
              shadow
              style={{width: wp(43), paddingVertical: hp(1.5)}}
              color="#434751">
              Accept
            </Button>
            <Button
              isLoading={delLoader}
              onPress={() => {
                DeclineRequest(brokerDetails.booking_id, 'rejected');
              }}
              shadow
              style={{
                width: wp(43),
                backgroundColor: light.accent,
                paddingVertical: hp(1.5),
              }}
              color="#434751">
              Decline
            </Button>
          </Block>
        </Block>
      </Modal>
    </Block>
  );
};
const dialogPosition = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  left: 0,
  height: hp(28),
};
export default BrokerDetails;
