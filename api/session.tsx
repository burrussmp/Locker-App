'use strict';

// imports
import AsyncStorage from '@react-native-community/async-storage';
import {Session} from 'store/types/auth.types';
import config from 'config';

const ASYNC_STORAGE_SESSION_KEY = 'session';

/**
 * @desc Store user session information in asynchronous storage as 'session' key
 * @param {Session | null} session The session object. If null, clear the 'session' key
 * in asynchronous storage.
 * @return {Promise<void>} A promise that resolves if successful otherwise can retrieve error.
 */
const setSession = async (session: Session | null): Promise<void> => {
  return session
    ? AsyncStorage.setItem(ASYNC_STORAGE_SESSION_KEY, JSON.stringify(session))
    : AsyncStorage.setItem(ASYNC_STORAGE_SESSION_KEY, '');
};

/**
 * @desc Get the user session information from asynchronous storage.
 * @return {Promise<Session | null>} The retrieved session token if found, otherwise
 * null.
 */
const getSession = async (): Promise<Session | null> => {
  const session = await AsyncStorage.getItem(ASYNC_STORAGE_SESSION_KEY);
  if (session) {
    return JSON.parse(session);
  } else {
    return null;
  }
};

/**
 * @desc Verify that a user token (access, refresh, etc) is valid.
 * @param {string} token The token to validate.
 * @return {Promise<boolean>} A promise that resolves to true if the token is valid else
 * false.
 */
const verifyToken = async (token: string): Promise<boolean> => {
  const res = await global.fetch(`${config.server}/auth/verify_token?token=${token}`, {method: 'HEAD'});
  return res.ok;
};

/**
 * @desc Retrieve a specific attribute from the user session object
 * stored in asynchronous storage.
 * @param {string} key The 'key' to retrieve from session
 * @return {Promise<string | undefined>} The session attribute if it exists.
 *
 */
const retrieveFromSession = async (key: string): Promise<string | undefined> => {
  const session = await getSession();
  if (session) {
    return session[key];
  }
};

/**
 * @desc Retrieves the User's access token from memory.
 * @return {Promise<string | undefined>} The access token of the user
 */
const getAccessToken = async (): Promise<string | undefined> => {
  return retrieveFromSession('access_token');
};

/**
 * @desc Retrieves the User's ID token from memory.
 * @return {Promise<string | undefined>} The ID token of the user.
 */
const getIDToken = async (): Promise<string | undefined> => {
  return retrieveFromSession('id_token');
};

/**
 * @desc Retrieves the User's refresh token from memory.
 * @return {Promise<string | undefined>} The refresh token of the user.
 */
const getRefreshToken = async (): Promise<string | undefined> => {
  return retrieveFromSession('refresh_token');
};

/**
 * @desc Retrieves the user Mongoose database ID.
 * @return {Promise<string | undefined>} The ID of the User.
 */
const getMyID = async (): Promise<string | undefined> => {
  return retrieveFromSession('_id');
};

export default {
  getAccessToken,
  getIDToken,
  getMyID,
  getRefreshToken,
  setSession,
  getSession,
  verifyToken,
};
