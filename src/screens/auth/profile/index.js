import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Block, Button, ImageComponent, Input, Text} from '../../../components';
import Header from '../../../common/header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const Profile = () => {
  return (
    <Block safearea white>
      <Header centerText={'Profile'} />
      <KeyboardAwareScrollView>
        <Block padding={[hp(3), wp(3), hp(2), wp(3)]} center flex={false}>
          <ImageComponent
            name="default_icon"
            height="120"
            width="120"
            radius={120}
          />
          <Text size={14} semibold secondary margin={[hp(1), 0]}>
            Change Picture
          </Text>
        </Block>
        <Block flex={false} padding={[hp(2), wp(5)]}>
          <Block flex={false} row space={'between'}>
            <Input style={{width: wp(42)}} label="First Name" />
            <Input style={{width: wp(42)}} label="Last Name" />
          </Block>
          <Input label="Email" />
          <Input label="Phone Number" keyboardType="number-pad" />
          <Input label="Address" />
          <Button style={{marginTop: hp(3)}} color="secondary">
            Save
          </Button>
        </Block>
      </KeyboardAwareScrollView>
    </Block>
  );
};
export default Profile;
