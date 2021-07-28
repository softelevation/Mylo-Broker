import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
};
export function notification(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.NOTIFICATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export default notification;
