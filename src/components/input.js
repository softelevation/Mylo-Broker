import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Block from './Block';
import Button from './CustomButton';
import Text from './Text';

const componentStyles = () => {
  return StyleSheet.create({
    label: {
      marginBottom: heightPercentageToDP(0.8),
    },
    input: {
      padding: heightPercentageToDP(1),
      borderWidth: 0.5,
      borderColor: 'black',
      borderRadius: 10,
      fontSize: 14,
      fontWeight: '500',
      color: '#000',
      backgroundColor: '#fff',
    },
    toggle: {
      position: 'absolute',
      alignItems: 'flex-end',
      width: 16 * 2,
      height: 16 * 2,
      top: 16,
      right: 0,
    },
  });
};

const Input = ({
  email,
  rightLabel,
  label,
  phone,
  number,
  secure,
  error,
  style,
  rightStyle,
  onRightPress,
  placeholder,
  editable = true,
  ...rest
}) => {
  const styles = componentStyles();
  const [toggleSecure, setToggleSecure] = useState(false);
  const renderLabel = () => (
    <Block flex={false}>
      {label ? (
        <Text body style={styles.label} black={!error} accent={error}>
          {label}
        </Text>
      ) : null}
    </Block>
  );

  const renderToggle = () => {
    if (!secure) {
      return null;
    }
    return (
      <Button
        style={styles.toggle}
        onPress={() => setToggleSecure({toggleSecure: !toggleSecure})}>
        {/* {rightLabel || (
          <Icon
            color={'#000'}
            size={14}
            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
          />
        )} */}
      </Button>
    );
  };

  const renderRight = () => {
    if (!rightLabel) {
      return null;
    }

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}>
        {rightLabel}
      </Button>
    );
  };

  const isSecure = toggleSecure ? false : secure;

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  const inputStyles = [
    styles.input,
    !editable && {
      backgroundColor: '#e9ecef',
      color: '#9c9c9c',
      borderColor: '#e9ecef',
    },
    error && {borderColor: 'red'},
    style,
  ];
  return (
    <Block flex={false} margin={[heightPercentageToDP(1), 0]}>
      {renderLabel()}
      <TextInput
        placeholder={placeholder}
        style={inputStyles}
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        editable={editable}
        autoCorrect={false}
        keyboardType={inputType}
        placeholderTextColor={'#000'}
        {...rest}
      />
      {renderToggle()}
      {renderRight()}
    </Block>
  );
};

export default Input;
