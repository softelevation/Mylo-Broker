import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  data: {},
  error: '',
};
export function register(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.success,
      };
    case ActionConstants.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
export default register;
