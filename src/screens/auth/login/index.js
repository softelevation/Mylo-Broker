import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  Block,
  Button,
  CustomButton,
  ImageComponent,
  Input,
  Text,
} from '../../../components';
import {ImageBackground, Keyboard} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../../../redux/action';
import images from '../../../assets';
import {t3, w1, w3} from '../../../components/theme/fontsize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {light} from '../../../components/theme/colors';
const Login = () => {
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
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: light.primary}}>
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
              <ImageBackground
                source={images.background}
                style={{
                  height: hp(47),
                  width: wp(100),
                  alignItems: 'center',
                }}>
                <Block flex={false} margin={[t3, 0, 0]}>
                  <ImageComponent
                    name="logo"
                    height={100}
                    width={100}
                    radius={20}
                  />
                </Block>
              </ImageBackground>
              <Block
                primary
                padding={[hp(2), wp(4), hp(2), wp(4)]}
                flex={false}>
                <Input
                  placeholder="Sign Up with Mobile"
                  keyboardType="number-pad"
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={() => setFieldTouched('mobile')}
                  error={touched.mobile && errors.mobile}
                  errorText={touched.mobile && errors.mobile}
                  style={{paddingVertical: hp(1.5)}}
                />
              </Block>
              <Block margin={[0, w1]} flex={false} row space={'around'}>
                <CustomButton
                  shadow
                  row
                  center
                  middle
                  borderWidth={1}
                  margin={[0, w1, 0, wp(6)]}
                  padding={[hp(1)]}
                  borderColorDeafult
                  color="primary">
                  <ImageComponent name="google_icon" height={20} width={20} />
                  <Text size={14} margin={[0, 0, 0, w3]}>
                    Google
                  </Text>
                </CustomButton>
                <CustomButton
                  shadow
                  row
                  center
                  middle
                  borderColorDeafult
                  margin={[0, wp(6), 0, w1]}
                  padding={[hp(1)]}
                  borderWidth={1}
                  color="primary">
                  <ImageComponent name="fb_icon" height={20} width={20} />
                  <Text size={14} margin={[0, 0, 0, w3]}>
                    Facebook
                  </Text>
                </CustomButton>
              </Block>
              <Block
                margin={[t3, 0]}
                style={{width: wp(85)}}
                alignSelf="center">
                <Text size={14}>
                  By continuing, you agree that you have read and accept out{' '}
                  <Text size={14} underline>
                    T&C
                  </Text>
                  s and{' '}
                  <Text size={14} underline>
                    Privacy Policy
                  </Text>
                </Text>
              </Block>
            </Block>

            <Block primary padding={[0, wp(3), 0, wp(3)]} flex={false}>
              <Button
                isLoading={isLoad}
                disabled={!isValid || !dirty}
                onPress={handleSubmit}
                color="secondary">
                CONTINUE
              </Button>
            </Block>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default Login;
