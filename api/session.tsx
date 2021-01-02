/**
 * @description AsyncStorage API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from 'store/types/auth.types';
import config from 'config';
import fetch from 'node-fetch';

export const ASYNC_STORAGE_SESSION_KEY = 'session';

/**
 * @desc Store user session information in asynchronous storage as 'session' key
 * @param {Session | undefined} session The session object. If null, clear the 'session' key
 * in asynchronous storage.
 * @return {Promise<void>} A promise that resolves if successful otherwise can retrieve error.
 */
const setSession = async (session?: Session): Promise<void> => (session
  ? AsyncStorage.setItem(ASYNC_STORAGE_SESSION_KEY, JSON.stringify(session))
  : AsyncStorage.setItem(ASYNC_STORAGE_SESSION_KEY, ''));

/**
 * @desc Get the user session information from asynchronous storage.
 * @return {Promise<Session | undefined>} The retrieved session token if found, otherwise
 * null.
 */
const getSession = async (): Promise<Session | undefined> => {
  const session = await AsyncStorage.getItem(ASYNC_STORAGE_SESSION_KEY);
  return session ? JSON.parse(session) as Session : undefined;
};

/**
 * @desc Verify that a user token (access, refresh, etc) is valid.
 * @param {string} token The token to validate.
 * @return {Promise<boolean>} A promise that resolves to true if the token is valid else
 * false.
 */
const verifyToken = async (token: string): Promise<boolean> => {
  const res = await fetch(`${config.server}/auth/verify_token?token=${token}`, { method: 'HEAD' });
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
  return undefined;
};

/**
 * @desc Retrieves the User's access token from memory.
 * @return {Promise<string | undefined>} The access token of the user
 */
const getAccessToken = async (): Promise<string | undefined> => retrieveFromSession('access_token');

/**
 * @desc Retrieves the User's ID token from memory.
 * @return {Promise<string | undefined>} The ID token of the user.
 */
const getIDToken = async (): Promise<string | undefined> => retrieveFromSession('id_token');

/**
 * @desc Retrieves the User's refresh token from memory.
 * @return {Promise<string | undefined>} The refresh token of the user.
 */
const getRefreshToken = async (): Promise<string | undefined> => retrieveFromSession('refresh_token');

/**
 * @desc Retrieves the user Mongoose database ID.
 * @return {Promise<string | undefined>} The ID of the User.
 */
const getMyID = async (): Promise<string | undefined> => retrieveFromSession('id');

export default {
  getAccessToken,
  getIDToken,
  getMyID,
  getRefreshToken,
  setSession,
  getSession,
  verifyToken,
};
