/**
 * @description API Utilities
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */

import { Platform } from 'react-native';
import fetch, { Response } from 'node-fetch';
import FormData from 'form-data';

import store from 'store/index';
import config from 'config';

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
 * @param {Record<string, string> | undefined} optionalHeaders Optional headers
 * @return {Promise<Record<string, string>>} HTTP headers to interact with Locker's
 * API.
 */
const getHeaders = (optionalHeaders:Record<string, string> | undefined = undefined): Record<string, string> => {
  const idAndAccessToken = getIDAndAccessToken();
  return {
    ...optionalHeaders,
    Authorization: `Bearer ${idAndAccessToken.access_token || ''}`,
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

/**
 * @desc Generic HTTP GET request
 * @param {string} url The url
 * @param {Record<string, string> | FormData | undefined} body The body of the post request
 * @param {Record<string, string | undefined}query Optional query parameters (key-value dictionary)
 * @return {Promise<Response>} The HTTP response if successful otherwise an error is thrown.
 */
const postRequest = async (url: string, data?: Record<string, string> | FormData, query?: Record<string, string>): Promise<Response> => {
  const headers = getHeaders(typeof data === 'object' ? { 'Content-Type': 'application/json' } : undefined);
  const method = 'POST';
  const body = typeof data === 'object' ? JSON.stringify(data) : data;
  const queryString = new URLSearchParams(query).toString();
  const res = await fetch(`${config.server}${url}?${queryString}`, { method, headers, body });
  if (res.ok) {
    return res;
  }
  throw await handleError(res);
};

/**
 * @desc Generic HTTP GET Request
 * @param {string} url The url
 * @param {Record<string, string | undefined} query Optional query parameters (key-value dictionary)
 * @return {Promise<Response>} The HTTP response if successful otherwise an error is thrown.
 */
const getRequest = async (url: string, query?: Record<string, string>): Promise<Response> => {
  const headers = getHeaders();
  const method = 'GET';
  const queryString = new URLSearchParams(query).toString();
  const res = await fetch(`${config.server}${url}?${queryString}`, { method, headers});
  if (res.ok) {
    return res;
  }
  throw await handleError(res);
};

/**
 * @desc Generic HTTP DELETE Request
 * @param {string} url The url
 * @param {Record<string, string | undefined} query Optional query parameters (key-value dictionary)
 * @return {Promise<Response>} The HTTP response if successful otherwise an error is thrown.
 */
const deleteRequest = async (url: string, query?: Record<string, string>): Promise<Response> => {
  const headers = getHeaders();
  const method = 'DELETE';
  const queryString = new URLSearchParams(query).toString();
  const res = await fetch(`${config.server}${url}?${queryString}`, { method, headers});
  if (res.ok) {
    return res;
  }
  throw await handleError(res);
};

export default {
  getHeaders,
  handleError,
  getIDAndAccessToken,
  createURI,
  validateSizeParam,
  postRequest,
  getRequest,
  deleteRequest,
};
