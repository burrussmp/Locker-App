'use strict';

import session from './session';

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
};
