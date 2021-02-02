import {all} from 'redux-saga/effects';
import {loginWatcher} from './auth/login/saga';
import {brokerWatcher} from './broker/saga';
export default function* rootSaga() {
  yield all([loginWatcher(), brokerWatcher()]);
}
