import {ActionConstants} from '../../constants';

const profileRequest = (payload) => {
  return {
    type: ActionConstants.PROFILE_REQUEST,
    payload,
    res: false,
  };
};
const profileSuccess = (data) => {
  return {
    type: ActionConstants.PROFILE_SUCCESS,
    data,
    res: true,
  };
};
const profileError = (error) => {
  return {
    type: ActionConstants.PROFILE_ERROR,
    error,
    res: false,
  };
};
const profileFlush = (error) => {
  return {
    type: ActionConstants.PROFILE_FLUSH,
  };
};

export {profileRequest, profileError, profileSuccess, profileFlush};
