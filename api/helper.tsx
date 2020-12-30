import { Platform } from 'react-native';
import { Response } from 'node-fetch';

import store from 'store/index';
import sessionAPI from 'api/session';

/**
 * @desc Retrieve the user's ID and access token from redux rather
 * than async storage,.
 * @return "{
 *  "id" : user ID,
 *  "access_token" : user access token
 * } if it exists otherwise throws an error
 */
const getIDAndAccessToken = (): {'id': string, 'access_token': string} => {
  const state = store.getState();
  return {
    id: state.auth.session.id,
    access_token: state.auth.session.access_token,
  };
};

/**
 * @desc Handle an HTTP error by extracting the error message and the status
 * of the HTTP response.
 * @param {Response} res The HTTP response.
 * @return {Promise<Error>} Return a promise that resolves to an error object that
 * includes the following information stringified.
 * {
 *  "status": "statusCode",
 *  "error": "errorMessage"
 * }
 */
const handleError = async (res: Response): Promise<Error> => {
  const { status } = res;
  const error = await res.json() as Record<string, string>;
  return new Error(
    JSON.stringify({
      status,
      error: error.error,
    }),
  );
};

/**
 * @desc Retrieve the access token from Async Storage and properly set the
 * 'Authorization' header as 'Bearer <access token>'
 * @return {Promise<Record<string, string>>} HTTP headers to interact with Locker's
 * API.
 */
const getHeaders = async (): Promise<Record<string, string>> => {
  const token = await sessionAPI.getAccessToken();
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || ''}`,
  };
};

/**
 * @desc Create a URI from a blob that can be used to dynamically render images and
 * related content. Supports both IOS and Android.
 * @param {Response} res The HTTP response.
 * @return {Promise<string>} The URI of the media object which can be dynamically rendered.
 */
const createURI = async (res: Response): Promise<string> => {
  const blob = await res.blob();
  if (Platform.OS === 'ios') {
    return (global.URL || global.webkitURL || global || {}).createObjectURL(
      blob,
    );
  }
  const fileReaderInstance = new global.FileReader();
  fileReaderInstance.readAsDataURL(blob as unknown as Blob);
  return new Promise((resolve) => {
    fileReaderInstance.onload = () => {
      resolve(fileReaderInstance.result as string);
    };
  });
};

const AllowedSizes = ['small', 'medium', 'large', 'xlarge'];
/**
 * @desc Validate that an image query parameter 'size' is supported.
 * @param {string} size The size query parameter value.
 * @return {boolean} true if supported else false
 */
const validateSizeParam = (size: string): boolean => AllowedSizes.includes(size);

export default {
  getHeaders,
  handleError,
  getIDAndAccessToken,
  createURI,
  validateSizeParam,
};
