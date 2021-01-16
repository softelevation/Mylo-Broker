import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, Button, ImageComponent, Input, Text} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import Otp from '../../../components/otp';
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
const Register = () => {
  const nav = useNavigation();
  const [counter, setCounter] = useState(59);

  // First Attempts
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
          <Otp />
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
            center
            secondary
            margin={[hp(2), 0, 0, 0]}>
            Change phone number
          </Text>
        </Block>
      </Block>
      <Block primary padding={[0, wp(3), 0, wp(3)]} flex={false}>
        <Button onPress={() => nav.navigate('Home')} color="secondary">
          Verify Otp
        </Button>
      </Block>
    </KeyboardAvoidingView>
  );
};

export default Register;
