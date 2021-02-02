/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc All the actions necessary to authorize a user
 * Actions in redux are dispatched to the store. The store uses the appropriate reducer
 * to change the state based on the current state and the dispatched action.
 */

import {
  AuthActions,
  SET_SESSION,
  LOGOUT,
  VERIFY_TOKEN,
  Session,
} from 'store/types/auth.types';

const verifyToken = (verified: boolean): AuthActions => ({
  type: VERIFY_TOKEN,
  verified,
});

const setSession = (payload: Session): AuthActions => ({
  type: SET_SESSION,
  session: payload,
});

const logout = (): AuthActions => ({
  type: LOGOUT,
});

export default {
  logout,
  setSession,
  verifyToken,
};
