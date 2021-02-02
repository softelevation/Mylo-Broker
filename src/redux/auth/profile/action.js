import {ActionConstants} from '../../constants';

export const profileRequest = (payload) => {
  return {
    type: ActionConstants.PROFILE_REQUEST,
    payload,
    res: false,
  };
};
export const profileSuccess = (data) => {
  return {
    type: ActionConstants.PROFILE_SUCCESS,
    data,
    res: true,
  };
};
export const profileError = (error) => {
  return {
    type: ActionConstants.PROFILE_ERROR,
    error,
    res: false,
  };
};

export const profileUpdateRequest = (payload) => {
  return {
    type: ActionConstants.PROFILE_UPDATE_REQUEST,
    payload,
    res: false,
  };
};
export const profileUpdateSuccess = (data) => {
  return {
    type: ActionConstants.PROFILE_UPDATE_SUCCESS,
    data,
    res: true,
  };
};
export const profileUpdateError = (error) => {
  return {
    type: ActionConstants.PROFILE_UPDATE_ERROR,
    error,
    res: false,
  };
};

export const profileFlush = (error) => {
  return {
    type: ActionConstants.PROFILE_FLUSH,
  };
};
