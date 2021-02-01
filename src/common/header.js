import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, CustomButton, ImageComponent, Text} from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import {DrawerActions, useNavigation} from '@react-navigation/native';
const Header = ({
  leftIcon,
  centerText,
  rightText,
  menu,
  menuColor,
  navigation,
}) => {
  const nav = useNavigation();
  return (
    <Block
      center
      row
      space={'between'}
      padding={[hp(1.5)]}
      secondary
      flex={false}>
      {leftIcon ? (
        <CustomButton
          flex={1}
          left
          middle
          onPress={() =>
            navigation ? nav.goBack() : nav.dispatch(DrawerActions.openDrawer())
          }>
          <ImageComponent
            name={menu}
            height="25"
            width="25"
            color={menuColor}
          />
        </CustomButton>
      ) : (
        <CustomButton flex={1} left middle />
      )}
      <Block flex={false} center middle>
        <Text
          semibold
          // style={{width: wp(40)}}
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
  leftIcon: true,
  menu: 'menu_icon',
  menuColor: '',
};
Header.propTypes = {
  centerText: PropTypes.string,
  rightIcon: PropTypes.string,
  leftIcon: PropTypes.bool,
  menu: PropTypes.string,
  menuColor: PropTypes.string,
};
export default Header;
