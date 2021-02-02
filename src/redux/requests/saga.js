import {ActionConstants} from '../constants';
import {
  customerListError,
  customerListSuccess,
  statusChangeError,
  statusChangeSuccess,
} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api, statusApi} from './api';

export function* customerRequest(action) {
  try {
    const response = yield call(Api);
    if (response.data.status === 1) {
      yield put(customerListSuccess(response.data.data));
    } else {
      yield put(customerListError(response));
    }
  } catch (err) {
    yield put(customerListError(err));
  }
}
export function* statusRequest(action) {
  try {
    const response = yield call(statusApi, action.payload);
    if (response.data.status === 1) {
      yield put(statusChangeSuccess(response.data));
    } else {
      yield put(statusChangeError(response));
    }
  } catch (err) {
    yield put(statusChangeError(err));
  }
}

export function* customerWatcher() {
  yield all([
    takeLatest(ActionConstants.CUSTOMERS_LIST_REQUEST, customerRequest),
    takeLatest(ActionConstants.STATUS_CHANGE_REQUEST, statusRequest),
  ]);
}
export default customerWatcher;
