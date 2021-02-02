import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CELL_COUNT = 6;
const Otp = ({value, setValue}) => {
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => (
        <View style={[styles.cell, isFocused && styles.focusCell]}>
          <Text
            style={{fontSize: 25}}
            key={index}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 2,
    borderColor: '#EBEBEB',
    height: hp(6),
    width: wp(13),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  focusCell: {
    borderColor: '#1A1A1A',
  },
});
export default Otp;
