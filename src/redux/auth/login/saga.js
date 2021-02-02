import {ActionConstants} from '../../constants';
import {loginError, loginSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import AsyncStorage from '@react-native-community/async-storage';
import * as navigation from '../../../routes/NavigationService';
const SaveToken = async (token) => {
  const parsedJson = JSON.stringify(token);
  return await AsyncStorage.setItem('token', parsedJson);
};

export function* loginRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield call(SaveToken, response.data);
      yield put(loginSuccess(response.data));
      navigation.navigate('Register');
    } else {
      yield put(loginError(response));
    }
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* loginWatcher() {
  yield all([takeLatest(ActionConstants.LOGIN_REQUEST, loginRequest)]);
}
export default loginWatcher;
