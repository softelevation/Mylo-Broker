import {combineReducers} from 'redux';
import user from './auth/reducer';
import customer from './requests/reducer';
const rootreducer = combineReducers({
  user,
  customer,
});
export default rootreducer;
