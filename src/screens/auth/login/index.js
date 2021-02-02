import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, Button, ImageComponent, Input, Text} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../../../redux/action';
const Login = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.user.login.loading);

  const submitValues = (values, {resetForm}) => {
    dispatch(loginRequest(values.mobile));
    Keyboard.dismiss();
    setTimeout(() => {
      resetForm();
    }, 100);
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={hp(5)}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Formik
        initialValues={{mobile: ''}}
        onSubmit={submitValues}
        validationSchema={yup.object().shape({
          mobile: yup
            .string()
            .min(10)
            .max(15)
            .required('Mobile Number is Required'),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
          dirty,
          isValid,
        }) => (
          <>
            <Block onStartShouldSetResponder={() => Keyboard.dismiss()} white>
              <Block margin={[hp(6), 0, 0, 0]} center flex={false}>
                <ImageComponent
                  name="logo"
                  height={100}
                  width={100}
                  radius={20}
                />
                <Text secondary semibold margin={[hp(4), 0, 0, 0]} h1 center>
                  Hi.
                </Text>
                <Text grey h1 center>
                  Let's get started
                </Text>
              </Block>
              <Block
                primary
                padding={[hp(6), wp(5), hp(2), wp(5)]}
                flex={false}>
                <Input
                  placeholder="Enter Mobile Number"
                  label="Mobile Number"
                  keyboardType="number-pad"
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={() => setFieldTouched('mobile')}
                  error={touched.mobile && errors.mobile}
                  errorText={touched.mobile && errors.mobile}
                />
              </Block>
            </Block>

            <Block primary padding={[0, wp(3), 0, wp(3)]} flex={false}>
              <Button
                isLoading={isLoad}
                disabled={!isValid || !dirty}
                onPress={handleSubmit}
                color="secondary">
                GET OTP
              </Button>
            </Block>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default Login;
