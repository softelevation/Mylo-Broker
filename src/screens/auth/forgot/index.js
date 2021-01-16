import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, Button, ImageComponent, Input, Text} from '../../../components';
import {useNavigation} from '@react-navigation/native';
const Forgot = () => {
  const nav = useNavigation();
  return (
    <>
      <Block middle white safearea>
        <Block padding={[0, wp(4), 0, wp(4)]} center flex={false}>
          <ImageComponent name="forgot_icon" height={220} width={300} />
          <Text margin={[hp(2), 0, 0, 0]} size={16} center>
            Enter the Mobile Number associated with your account and we'll send
            you an Otp with instructions to reset your password.
          </Text>
        </Block>
        <Block padding={[hp(2), wp(5), 0, wp(5)]} flex={false}>
          <Input placeholder="Enter Mobile Number" label="Mobile Number" />
          <Button color="secondary">Reset Password</Button>

          <Text onPress={() => nav.navigate('Register')} semibold body center>
            Wait, I remember my password
          </Text>
        </Block>
      </Block>
    </>
  );
};

export default Forgot;
