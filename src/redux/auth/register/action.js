import {ActionConstants} from '../../constants';

const registerRequest = (payload) => {
  return {
    type: ActionConstants.REGISTER_REQUEST,
    payload,
  };
};
const registerSuccess = (data) => {
  return {
    type: ActionConstants.REGISTER_SUCCESS,
    data,
  };
};
const registerError = (error) => {
  return {
    type: ActionConstants.REGISTER_SUCCESS,
    error,
  };
};

export {registerRequest, registerError, registerSuccess};
