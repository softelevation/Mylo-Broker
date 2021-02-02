import {ActionConstants} from '../constants';
import {brokerlistError, brokerlistSuccess} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';

export function* brokerRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(brokerlistSuccess(response.data));
    } else {
      yield put(brokerlistError(response));
    }
  } catch (err) {
    yield put(brokerlistError());
  }
}

export function* brokerWatcher() {
  yield all([takeLatest(ActionConstants.BROKER_LIST_REQUEST, brokerRequest)]);
}
export default brokerWatcher;
