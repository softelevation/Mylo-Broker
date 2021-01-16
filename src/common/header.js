import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, CustomButton, ImageComponent, Text} from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import {DrawerActions, useNavigation} from '@react-navigation/native';
const Header = ({leftIcon, centerText, rightText}) => {
  const nav = useNavigation();
  return (
    <Block
      center
      row
      space={'between'}
      padding={[hp(1.5)]}
      secondary
      flex={false}>
      <CustomButton
        flex={1}
        left
        middle
        onPress={() => nav.dispatch(DrawerActions.openDrawer())}>
        <ImageComponent name="menu_icon" height="25" width="25" />
      </CustomButton>
      <Block flex={1} center middle>
        <Text
          semibold
          style={{width: wp(40)}}
          transform="uppercase"
          center
          white>
          {centerText}
        </Text>
      </Block>
      <Block right middle>
        <Text white>{rightText}</Text>
      </Block>
    </Block>
  );
};

Header.defaultProps = {
  centerText: 'Home',
  rightText: '',
  leftIcon: 'md-menu-outline',
};
Header.propTypes = {
  centerText: PropTypes.string,
  rightIcon: PropTypes.string,
  leftIcon: PropTypes.string,
};
export default Header;
