import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, Button, ImageComponent, Input, Text} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import Otp from '../../../components/otp';
import {Alert, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
const Register = () => {
  const nav = useNavigation();
  const [counter, setCounter] = useState(59);
  const [value, setValue] = useState('');

  // First Attempts
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const verifyOtp = () => {
    if (value === '123456') {
      nav.navigate('Home');
    } else {
      Alert.alert('Invalid Otp', 'Please enter a valid otp');
    }
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={hp(5)}
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <>
        <Block
          onStartShouldSetResponder={() => Keyboard.dismiss()}
          white
          safearea>
          <Block padding={[hp(4), 0, 0, 0]} center flex={false}>
            <ImageComponent name="logo" height={100} width={100} radius={20} />
            <Text margin={[hp(3), wp(8), 0, wp(8)]} h3 center>
              Enter the OTP received on your register mobile number
              {/* We just sent you a verified code via a phone xxxxxx391 */}
            </Text>
          </Block>
          <Block padding={[hp(6), wp(5), 0, wp(5)]} flex={false}>
            <Otp value={value} setValue={(a) => setValue(a)} />
            <Block flex={false} row space="between" margin={[hp(2), 0, 0, 0]}>
              {counter > 0 && (
                <Text errorColor h3>
                  Expired {'00:'}
                  {counter}
                </Text>
              )}
              <Text h3>Resend Otp</Text>
            </Block>
            <Text
              onPress={() => nav.goBack()}
              body
              style={{alignSelf: 'center'}}
              transform="uppercase"
              secondary
              margin={[hp(2), 0, 0, 0]}>
              Change phone number
            </Text>
          </Block>
        </Block>
        <Block primary padding={[0, wp(3), 0, wp(3)]} flex={false}>
          <Button
            disabled={value.length < 6}
            onPress={() => verifyOtp()}
            color="secondary">
            VERIFY OTP
          </Button>
        </Block>
      </>
    </KeyboardAvoidingView>
  );
};

export default Register;
