import {ActionConstants} from '../../constants';
import {profileError, profileSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api, updateApi} from './api';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response.data.status === 1) {
      yield put(profileSuccess(response.data.data));
    } else {
      yield put(profileError(response));
    }
  } catch (err) {
    yield put(profileError(err));
  }
}

export function* updateRequest(action) {
  try {
    const response = yield call(updateApi, action.payload);
    if (response.data.status === 1) {
      yield put(profileSuccess(response.data.data));
    } else {
      yield put(profileError(response));
    }
  } catch (err) {
    yield put(profileError(err));
  }
}

export function* profileWatcher() {
  yield all([takeLatest(ActionConstants.PROFILE_REQUEST, request)]);
  yield all([
    takeLatest(ActionConstants.PROFILE_UPDATE_REQUEST, updateRequest),
  ]);
}
export default profileWatcher;
