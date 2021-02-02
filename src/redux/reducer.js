import {combineReducers} from 'redux';
import user from './auth/reducer';
import customer from './requests/reducer';
import socket from './socket/reducer';

const rootreducer = combineReducers({
  user,
  customer,
  socket,
});
export default rootreducer;
