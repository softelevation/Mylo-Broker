import {ActionConstants} from '../constants';

export const customerListRequest = () => {
  return {
    type: ActionConstants.CUSTOMERS_LIST_REQUEST,
  };
};
export const customerListSuccess = (data) => {
  return {
    type: ActionConstants.CUSTOMERS_LIST_SUCCESS,
    data,
  };
};
export const customerListError = (error) => {
  return {
    type: ActionConstants.CUSTOMERS_LIST_ERROR,
    error,
  };
};
export const statusChangeRequest = (payload) => {
  return {
    type: ActionConstants.STATUS_CHANGE_REQUEST,
    payload,
    res: false,
  };
};
export const statusChangeSuccess = (data) => {
  return {
    type: ActionConstants.STATUS_CHANGE_SUCCESS,
    data,
    res: true,
  };
};
export const statusChangeError = (error) => {
  return {
    type: ActionConstants.STATUS_CHANGE_ERROR,
    error,
    res: false,
  };
};
