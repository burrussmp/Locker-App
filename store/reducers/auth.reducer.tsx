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
} from 'store/types/auth.types';

interface AuthState {
  token: string;
}

const AuthInitialState = {
  token: '',
};

const AuthorizationReducer = (
  state = AuthInitialState,
  action: AuthorizationActions
): AuthState => {
  switch (action.type) {
    case LOGOUT:
      return {
        token: '',
      };
    case SIGN_UP:
      return state;
    case LOGIN:
      return {
        token: action.token,
      };
    default:
      return state;
  }
};

export default AuthorizationReducer;
