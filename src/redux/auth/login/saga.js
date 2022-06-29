import {ActionConstants} from '../../constants';
import {loginError, loginSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import * as navigation from '../../../routes/NavigationService';
import {Alerts} from '../../../utils/commonUtils';
import {light} from '../../../components/theme/colors';

export function* loginRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response.data.status === 1 && response.data.data.roll_id === 2) {
      yield put(loginSuccess(response.data));
      Alerts('Success', response.data.message, light.success);
      navigation.navigate('Register', {
        phone_no: action.payload,
      });
    } else if (response.data.data.roll_id === 1) {
      Alerts(
        'Error',
        'Please login with registered broker number ',
        light.accent,
      );
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
