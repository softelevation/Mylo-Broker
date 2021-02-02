import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  broker: [],
  error: '',
};
export function list(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.BROKER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.BROKER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        broker: action.data,
      };
    case ActionConstants.BROKER_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

const broker = combineReducers({
  list,
});
export default broker;
