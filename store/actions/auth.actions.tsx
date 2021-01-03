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

const VerifyToken = (verified: boolean): AuthorizationActions => ({
  type: VERIFY_TOKEN,
  verified,
});

const SetSession = (payload: Session): AuthorizationActions => ({
  type: SET_SESSION,
  session: payload,
});

const Logout = (): AuthorizationActions => ({
  type: LOGOUT,
});

export default {
  Logout,
  SetSession,
  VerifyToken,
};
