import {ActionConstants} from '../constants';

export const brokerlistRequest = (payload) => {
  return {
    type: ActionConstants.BROKER_LIST_REQUEST,
    payload,
    res: false,
  };
};
export const brokerlistSuccess = (data) => {
  return {
    type: ActionConstants.BROKER_LIST_SUCCESS,
    data,
    res: true,
  };
};
export const brokerlistError = (error) => {
  return {
    type: ActionConstants.BROKER_LIST_ERROR,
    error,
    res: false,
  };
};
