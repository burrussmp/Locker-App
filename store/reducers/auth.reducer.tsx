/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc The slice reducer for the authorization. Handles all the logic necessary to
 * produce a new state given the old state and the action
 */

import {
  AuthorizationActions,
  SIGN_UP,
  LOGIN,
  LOGOUT,
  Session,
} from 'store/types/auth.types';

type AuthState = Session | null;

const AuthInitialState = null;

const AuthorizationReducer = (
  state = AuthInitialState,
  action: AuthorizationActions
): AuthState => {
  switch (action.type) {
    case LOGOUT:
      return null;
    case SIGN_UP:
      return action.session;
    case LOGIN:
      return action.session;
    default:
      return state;
  }
};

export default AuthorizationReducer;
