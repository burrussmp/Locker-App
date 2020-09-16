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
  VERIFY_TOKEN,
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
      return Object.assign({}, state, {
        session: null,
      });
    case SIGN_UP:
      return Object.assign({}, state, {
        session: action.session,
      });
    case LOGIN:
      return Object.assign({}, state, {
        session: action.session,
      });
    case VERIFY_TOKEN:
      return Object.assign({}, state, {
        verified: action.verified,
      });
    default:
      return state;
  }
};

export default AuthorizationReducer;
