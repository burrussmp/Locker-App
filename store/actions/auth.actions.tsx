/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc All the actions necessary to authorize a user
 * Actions in redux are dispatched to the store. The store uses the appropriate reducer
 * to change the state based on the current state and the dispatched action.
 */

import {
  AuthorizationActions,
  SET_SESSION,
  LOGOUT,
  VERIFY_TOKEN,
  Session,
} from 'store/types/auth.types';

const VerifyToken = (verified: boolean): AuthorizationActions => {
  return {
    type: VERIFY_TOKEN,
    verified: verified,
  };
};

const SetSession = (payload: Session): AuthorizationActions => {
  return {
    type: SET_SESSION,
    session: payload,
  };
};

const Logout = (): AuthorizationActions => {
  return {
    type: LOGOUT,
  };
};

export default {
  Logout,
  SetSession,
  VerifyToken,
};
