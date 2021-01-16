import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../common/header';
import {Block, Button, Input, Text} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const BecomeBroker = () => {
  return (
    <Block safearea primary>
      <Header centerText={'Become Broker'} />
      <KeyboardAwareScrollView>
        <Block primary flex={false} padding={[hp(2), wp(4)]}>
          <Text size={14}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </Text>
          <Block margin={[hp(3), 0]}>
            <Input label="Company Name" />
            <Input label="Email" />
            <Input label="Phone Number" keyboardType="number-pad" />
            <Input label="Country" />
            <Input label="City" />
          </Block>
          <Button color="secondary">Submit Application</Button>
        </Block>
      </KeyboardAwareScrollView>
    </Block>
  );
};

export default BecomeBroker;
