import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {omitBy, isUndefined, isNull} from 'lodash';
import config from './config';
import {
  validObjectWithParameterKeys,
  strictValidString,
  strictValidObject,
} from './commonUtils';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

// const errorCodes = [
//   '',
//   messages.VALIDATIONS.INVALID_EMAIL_AND_PASSWORD,
//   messages.VALIDATIONS.ACCOUNT_LOCKED,
//   '',
//   messages.VALIDATIONS.TENANT_NOT_ENABLED,
//   messages.VALIDATIONS.ACCOUNT_INACTIVE,
//   messages.VALIDATIONS.USER_NOT_VERIFIED,
// ];

function formatUrl(path) {
  if (!path) {
    return path;
  }
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  // Prepend `/api` to relative URL, to proxy to API server.
  return `${config.apiHost}${adjustedPath}`;
}
export default class ApiClient {
  constructor() {
    methods.forEach((method) => {
      this[method] = this._req(method);
    });
  }

  _req = (method) => (path, {params, data} = {}) =>
    new Promise((resolve, reject) => {
      const apiObj = {
        method,
        url: formatUrl(path),
      };
      if (params) {
        const emptySting = (val) => val === '';
        const cleanFromUndefined = omitBy(params, isUndefined);
        const cleanFromNull = omitBy(cleanFromUndefined, isNull);
        const localParam = omitBy(cleanFromNull, emptySting);
        apiObj.params = localParam || {};
      }
      if (data) {
        apiObj.data = data;
      }
      const http = axios.create({
        headers: {'Content-Type': 'application/json'},
      });

      http.interceptors.request.use(
        async (v) => {
          const headerConfig = v;
          const token = await AsyncStorage.getItem('token');
          headerConfig.headers['x-access-token'] = token
            ? JSON.parse(token)
            : null;
          return headerConfig;
        },
        (error) => reject(error),
      );
      http(apiObj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          const isValidErrorObject =
            validObjectWithParameterKeys(error, ['response']) &&
            validObjectWithParameterKeys(error.response, ['status', 'data']);
          if (isValidErrorObject) {
            const {data: responseData = {}} = error.response;
            const {message, errorCode} = responseData;

            if (errorCode) {
              // reject(errorCodes[errorCode]);
              return;
            }

            // Check if user's session is expired
            if (strictValidString(message)) {
              reject(message);
            } else if (
              strictValidObject(message) &&
              validObjectWithParameterKeys(message, ['message'])
            ) {
              reject(message.message);
            } else {
              reject('Oops! went something wrong');
            }
          } else if (strictValidString(error)) {
            reject(error);
          } else {
            reject('Oops! went something wrong');
          }
          reject(error);
        });
    });
}
