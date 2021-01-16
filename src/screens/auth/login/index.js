import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, Button, ImageComponent, Input, Text} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
const Login = () => {
  const nav = useNavigation();
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Block
        onStartShouldSetResponder={() => Keyboard.dismiss()}
        white
        safearea>
        <Block margin={[hp(6), 0, 0, 0]} center flex={false}>
          <ImageComponent name="logo" height={100} width={100} radius={20} />
          <Text secondary semibold margin={[hp(4), 0, 0, 0]} h1 center>
            Hi.
          </Text>
          <Text grey h1 center>
            Let's get started
          </Text>
        </Block>
        <Block primary padding={[hp(6), wp(5), hp(4), wp(5)]} flex={false}>
          <Input
            placeholder="Enter Mobile Number"
            label="Mobile Number"
            keyboardType="number-pad"
          />
        </Block>
      </Block>
      <Block primary padding={[0, wp(3), 0, wp(3)]} flex={false}>
        <Button onPress={() => nav.navigate('Register')} color="secondary">
          Get Otp
        </Button>
      </Block>
    </KeyboardAvoidingView>
  );
};

export default Login;
