import {combineReducers} from 'redux';
import user from './auth/reducer';
import broker from './broker/reducer';
const rootreducer = combineReducers({
  user,
  broker,
});
export default rootreducer;
