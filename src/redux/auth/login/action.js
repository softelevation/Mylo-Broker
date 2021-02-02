import {ActionConstants} from '../../constants';

const loginRequest = (payload) => {
  return {
    type: ActionConstants.LOGIN_REQUEST,
    payload,
    res: false,
  };
};
const loginSuccess = (data) => {
  return {
    type: ActionConstants.LOGIN_SUCCESS,
    data,
    res: true,
  };
};
const loginError = (error) => {
  return {
    type: ActionConstants.LOGIN_ERROR,
    error,
    res: false,
  };
};

export {loginRequest, loginError, loginSuccess};
