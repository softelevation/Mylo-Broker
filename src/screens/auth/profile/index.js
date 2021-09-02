import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Block, Button, ImageComponent, Input, Text} from '../../../components';
import Header from '../../../common/header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {profileRequest, profileUpdateRequest} from '../../../redux/action';
import {Formik} from 'formik';
import * as yup from 'yup';
import ActivityLoader from '../../../components/activityLoader';
import {
  strictValidString,
  strictValidObjectWithKeys,
} from '../../../utils/commonUtils';
import {useNavigation} from '@react-navigation/native';
import useHardwareBack from '../../../components/usehardwareBack';
import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacity, Image, Alert} from 'react-native';
import {config} from '../../../utils/config';
const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile.user);
  const isLoad = useSelector((state) => state.user.profile.loading);

  const submitValues = (values) => {
    console.log('hit');
    const data = {
      name: values.name,
      address: values.address,
      email: values.email,
      mobile_number: user.phone_no || values.mobile_number,
    };
    dispatch(profileUpdateRequest(data));
  };
  const [image, setImage] = useState('');
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
    }).then((v) => {
      console.log(v);
      setImage(v);
    });
  };

  const choosePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      includeBase64: true,
      useFrontCamera: true,
      cropping: true,
    }).then((v) => {
      console.log(v);
      setImage(v);
    });
  };
  const selectOption = () => {
    Alert.alert(
      'Mylo-Pro',
      'Choose your Suitable Option',
      [
        {
          text: 'Camera',
          onPress: () => {
            choosePhotoFromCamera();
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            choosePhoto();
          },
        },
        {
          text: 'Cancel',
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('Maps');
    return true;
  };

  useHardwareBack(handleBack);

  const renderProfileImagePath = () => {
    if (image.path) {
      return image.path;
    }
    if (strictValidObjectWithKeys(user) && strictValidString(user.image)) {
      return `${config.Api_Url}/${user.image}`;
    }

    return 'default_icon';
  };
  const renderProfile = () => {
    return (
      <Block alignSelf="center" flex={false}>
        <ImageComponent
          isURL={renderProfileImagePath() !== 'default_icon'}
          name={renderProfileImagePath()}
          radius={120}
          height={120}
          width={120}
        />
        <TouchableOpacity onPress={selectOption}>
          <Text size={14} semibold secondary margin={[hp(1), 0]}>
            Change Picture
          </Text>
        </TouchableOpacity>
      </Block>
    );
  };

  return (
    <Block safearea white>
      {isLoad && <ActivityLoader />}
      <Header centerText={'Profile'} />
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{
            name: user.name || '',
            email: user.email || '',
            mobile_number: user.phone_no || '',
            address: user.address || '',
          }}
          enableReinitialize
          onSubmit={submitValues}
          validationSchema={yup.object().shape({
            name: yup.string().min(2).max(15),
            email: yup.string().email(),
            address: yup.string().min(2),
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
          }) => {
            return (
              <>
                <Block padding={[hp(3), 0, 0]} flex={false}>
                  {renderProfile()}
                </Block>

                <Block flex={false} padding={[hp(1), wp(5)]}>
                  <Input
                    label="Name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    error={touched.name && errors.name}
                    errorText={touched.name && errors.name}
                  />
                  <Input
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    error={touched.email && errors.email}
                    errorText={touched.email && errors.email}
                  />
                  <Input
                    label="Phone Number"
                    keyboardType="number-pad"
                    value={values.mobile_number}
                    onChangeText={handleChange('mobile_number')}
                    onBlur={() => setFieldTouched('mobile_number')}
                    error={touched.mobile_number && errors.mobile_number}
                    errorText={touched.mobile_number && errors.mobile_number}
                    editable={!strictValidString(user.phone_no)}
                  />
                  <Input
                    label="Address"
                    value={values.address}
                    onChangeText={handleChange('address')}
                    onBlur={() => setFieldTouched('address')}
                    error={touched.address && errors.address}
                    errorText={touched.address && errors.address}
                  />
                  <Button
                    isLoading={isLoad}
                    onPress={handleSubmit}
                    disabled={!dirty && !image}
                    style={{marginTop: hp(3)}}
                    color="secondary">
                    Save
                  </Button>
                </Block>
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </Block>
  );
};
export default Profile;
