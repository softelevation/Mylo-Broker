import {ActionConstants} from '../../constants';
import {registerError, registerSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import AsyncStorage from '@react-native-community/async-storage';
import * as navigation from '../../../routes/NavigationService';

const SaveToken = async (token) => {
  return await AsyncStorage.setItem('token', token);
};

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response.data.status === 1) {
      yield call(SaveToken, response.data.data.accessToken);
      yield put(registerSuccess(response.data));
      navigation.navigate('Home');
    } else {
      alert(response.data.message);
      yield put(registerError(response));
    }
  } catch (err) {
    yield put(registerError(err));
  }
}

export function* registerWatcher() {
  yield all([takeLatest(ActionConstants.REGISTER_REQUEST, request)]);
}
export default registerWatcher;
