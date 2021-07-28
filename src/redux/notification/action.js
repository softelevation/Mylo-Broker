import {ActionConstants} from '../constants';

export const notificationRequest = (payload) => {
  return {
    type: ActionConstants.NOTIFICATION_REQUEST,
    payload,
    res: false,
  };
};
export const notificationSuccess = (data) => {
  return {
    type: ActionConstants.NOTIFICATION_SUCCESS,
    data,
    res: true,
  };
};
export const notificationError = (error) => {
  return {
    type: ActionConstants.NOTIFICATION_ERROR,
    error,
    res: false,
  };
};
