import {combineReducers} from 'redux';
import user from './auth/reducer';
import customer from './requests/reducer';
import socket from './socket/reducer';
import notification from './notification/reducer';
import location from './location/reducer';

const rootreducer = combineReducers({
  user,
  customer,
  socket,
  notification,
  location,
});
export default rootreducer;
