import {combineReducers} from 'redux';
import user from './auth/reducer';
import customer from './requests/reducer';
import socket from './socket/reducer';
import notification from './notification/reducer';

const rootreducer = combineReducers({
  user,
  customer,
  socket,
  notification,
});
export default rootreducer;
