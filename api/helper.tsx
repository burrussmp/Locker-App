'use strict';

import session from './session';
import store from 'store/index';

/**
 * @desc Retrieve the ID and access token from redux store
 * @return "{
 *  "id" : user ID,
 *  "access_token" : user access token
 * } if it exists otherwise throws an error
 */
interface IdAndToken {
  id: string;
  access_token: string;
}

const get_id_and_token_redux = (): undefined | IdAndToken => {
  const state = store.getState();
  if (!state.auth || !state.auth.session) {
    return undefined;
  }
  const myID = state.auth.session._id;
  const access_token = state.auth.session.access_token;
  return {
    id: myID,
    access_token: access_token,
  };
};

/**
 * @desc A wrapper to retrieve error (status code and message are JSON stringified)
 * @return Promise<Error>
 */
const handleError = async (res: any): Promise<Error> => {
  const status = res.status;
  const err = await res.json();
  return new Error(
    JSON.stringify({
      status: status,
      message: err,
    })
  );
};

/**
 * @desc A wrapper to retrieve token and set headers for React's Fetch API
 * @return Promise<Object>
 */
const getHeaders = async (): Promise<{}> => {
  const token = await session.getAccessToken();
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export default {
  getHeaders,
  handleError,
  get_id_and_token_redux,
};
