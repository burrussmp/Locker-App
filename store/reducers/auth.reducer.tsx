/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc The slice reducer for the authorization. Handles all the logic necessary to
 * produce a new state given the old state and the action
 */

import {
  AuthActions,
  AuthState,
  SET_SESSION,
  LOGOUT,
  VERIFY_TOKEN,
} from 'store/types/auth.types';

const AuthInitialState = {
  session: {
    access_token: '',
    id_token: '',
    refresh_token: '',
    _id: '',
  },
  verified: false,
};

/**
 * @desc A reducer for auth state and actions
 * @param {AuthState} state The auth state.
 * @param {AuthActions} action The dispatched action.
 * @return {AuthState} A new state.
 */
const AuthReducer = (state = AuthInitialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case LOGOUT:
      return AuthInitialState;
    case SET_SESSION:
      return { ...state, session: action.session };
    case VERIFY_TOKEN:
      return { ...state, verified: action.verified };
    default:
      return state;
  }
};

export default AuthReducer;
