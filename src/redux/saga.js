import {all} from 'redux-saga/effects';
import {loginWatcher} from './auth/login/saga';
import {registerWatcher} from './auth/register/saga';
import {profileWatcher} from './auth/profile/saga';
import {customerWatcher} from './requests/saga';
import {notificationWatcher} from './notification/saga';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    customerWatcher(),
    registerWatcher(),
    profileWatcher(),
    notificationWatcher(),
  ]);
}
