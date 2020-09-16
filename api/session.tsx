'use strict';

// imports
import {AsyncStorage} from 'react-native';
import {Session} from 'store/types/auth.types';

// HELPERS
/**
 *
 * @desc Saves user JWT token in memory
 * @param token : String - Token retrieved from server or empty to remove
 * @return Promise to be resolved
 */
const setSession = async (session: Session | null): Promise<void> => {
  return session
    ? AsyncStorage.setItem('session', JSON.stringify(session))
    : await AsyncStorage.setItem('session', '');
};

/**
 * @desc Get session
 * @param token : String - Token retrieved from server or empty to remove
 * @return Promise to be resolved
 */
const getSession = async (): Promise<{[key: string]: string} | null> => {
  const session_stringified = await AsyncStorage.getItem('session');
  if (session_stringified) {
    return JSON.parse(session_stringified);
  } else {
    return null;
  }
};

const retrieveFromSession = async (
  key: string
): Promise<string | undefined> => {
  const session = await getSession();
  if (session) {
    return session[key];
  }
};

/**
 * @desc Retrieves the user access JWT token from memory
 * @return Promise<String>
 */
const getAccessToken = async (): Promise<string | undefined> => {
  return retrieveFromSession('access_token');
};

/**
 * @desc Retrieves the user JWT token from memory
 * @return Promise<String>
 */
const getIDToken = async (): Promise<string | undefined> => {
  return retrieveFromSession('id_token');
};

/**
 * @desc Retrieves the user JWT  token from memory
 * @return Promise<String>
 */
const getRefreshToken = async (): Promise<string | undefined> => {
  return retrieveFromSession('refresh_token');
};

/**
 * @desc Retrieves the user Mongoose database ID
 * @return Promise<String>
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
};
