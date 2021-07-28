import {ActionConstants} from '../constants';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {notificationError, notificationSuccess} from './action';

export function* request(action) {
  try {
    const response = yield call(Api);
    if (response) {
      yield put(notificationSuccess(response.data.data));
    } else {
      yield put(notificationError(response));
    }
  } catch (err) {
    yield put(notificationError());
  }
}

export function* notificationWatcher() {
  yield all([takeLatest(ActionConstants.NOTIFICATION_REQUEST, request)]);
}
export default notificationWatcher;
