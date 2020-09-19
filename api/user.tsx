'use strict';
import config from 'config';
import session from 'api/session';
import apiHelper from 'api/helper';
import store from 'store/index';
/**
 * @desc Update password
 * @param password : string : new password
 * @param old_password : string : old password
 */
const UpdatePassword = async (
  password: string,
  old_password: string
): Promise<string | Error> => {
  const state = store.getState();
  if (!state.auth || !state.auth.session) {
    throw 'Cannot retrieve session from local memory';
  }
  const myID = state.auth.session._id;
  const access_token = state.auth.session.access_token;
  const params = {
    password: password,
    old_password: old_password,
  };
  const res = await global.fetch(
    `${config.server}/api/users/${myID}/password?access_token=${access_token}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  );
  console.log(res.ok);
  if (res.ok) {
    const result = await res.json();
    return result.message;
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Follow someone
 * @param password : string : new password
 * @param old_password : string : old password
 */
// const FollowSomeone = async (userID: string): Promise<string | Error>=> {
//   const res = await global.fetch(`${config.server}/api/users${myID}/password`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       password: password,
//       old_password: old_password.
//     }),
//   });
//   if (res.ok) {
//     const result = await res.json();
//     return result.message;
//   } else {
//     throw await apiHelper.handleError(res);
//   }
// };

export default {
  UpdatePassword,
};
