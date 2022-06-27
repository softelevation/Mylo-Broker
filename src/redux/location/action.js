import {ActionConstants} from '../constants';

export const locationRequest = (data) => {
  return {
    type: ActionConstants.LOCATION_REQUEST,
    data,
    res: false,
  };
};
export const locationSuccess = (data) => {
  return {
    type: ActionConstants.LOCATION_SUCCESS,
    data,
    res: true,
  };
};
