import {ActionConstants} from '../../constants';
import {loginError, loginSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import * as navigation from '../../../routes/NavigationService';

export function* loginRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    console.log('response: ', response);
    if (response.data.status === 1 && response.data.data.roll_id === 2) {
      yield put(loginSuccess(response.data));
      navigation.navigate('Register', {
        phone_no: action.payload,
      });
    } else if (response.data.data.roll_id === 1) {
      alert('Please login with registered broker number ');
      yield put(loginError(response));
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
